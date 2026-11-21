import React, { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Color, Object3D, BoxGeometry, MeshStandardMaterial } from 'three'
import { SEATS_DATA, SEAT_COLORS } from './SeatData.js'

const Seats = ({ onSelect, hoveredSeat, setHoveredSeat }) => {
  const [seatsData, setSeatsData] = useState(null)
  const instances = useRef()

  // Generate seats data on component mount
  React.useEffect(() => {
    setSeatsData(SEATS_DATA)
  }, [])

  // Create instanced mesh for seats
  const { count, positions, colors, seatIds, seatData } = useMemo(() => {
    if (!seatsData) return { count: 0, positions: [], colors: [], seatIds: [], seatData: {} }

    const totalSeats = seatsData.totalSeats
    const positions = new Float32Array(totalSeats * 3)
    const colors = new Float32Array(totalSeats * 3)
    const seatIdsMap = {}
    let index = 0

    // Walk through all seats
    Object.entries(seatsData.seats).forEach(([rowId, seats]) => {
      Object.entries(seats).forEach(([seatNum, seat]) => {
        positions[index * 3] = seat.x - 0.5
        positions[index * 3 + 1] = seat.y
        positions[index * 3 + 2] = seat.z - 0.4

        const color = new Color(seat.color)
        colors[index * 3] = color.r
        colors[index * 3 + 1] = color.g
        colors[index * 3 + 2] = color.b

        seatIdsMap[index] = seat.id
        seatData[seat.id] = seat

        index++
      })
    })

    return {
      count: index,
      positions,
      colors,
      seatIds: seatIdsMap,
      seatData
    }
  }, [seatsData])

  // Update seat colors based on interactions
  useFrame(() => {
    if (!instances.current) return

    const colorMaterial = instances.current.material

    // Update colors for hovered and selected seats
    Object.entries(seatData).forEach(([id, seat]) => {
      const seatIndex = parseInt(id.split('-').pop()) + (Object.keys(seatsData?.seats || {}).indexOf(id.split('-').slice(0, -1).join('-')) * 0)

      const idx = seatIndex
      if (idx >= 0 && idx < count) {
        const isHovered = hoveredSeat?.id === seat.id
        const isSelected = seat.id === hoveredSeat?.id

        if (isHovered) {
          const hoverColor = new Color(SEAT_COLORS.HOVERED)
          colorMaterial.colors[idx * 3] = hoverColor.r
          colorMaterial.colors[idx * 3 + 1] = hoverColor.g
          colorMaterial.colors[idx * 3 + 2] = hoverColor.b
        } else {
          const color = new Color(seat.color)
          colorMaterial.colors[idx * 3] = color.r
          colorMaterial.colors[idx * 3 + 1] = color.g
          colorMaterial.colors[idx * 3 + 2] = color.b
        }
      }
    })

    colorMaterial.colors.needsUpdate = true
  })

  if (!seatsData || count === 0) {
    return null
  }

  const handlePointerMove = (event) => {
    event.stopPropagation()
    const seatId = seatIds[Math.floor(event.instanceId)]
    if (seatId && seatData[seatId] && seatId !== hoveredSeat?.id) {
      setHoveredSeat(seatData[seatId])
    }
  }

  const handleClick = (event) => {
    event.stopPropagation()
    const seatId = seatIds[Math.floor(event.instanceId)]
    if (seatId && seatData[seatId] && seatData[seatId].status === 'available') {
      onSelect(seatData[seatId])
    }
  }

  return (
    <instancedMesh
      ref={instances}
      args={[new BoxGeometry(1, 1, 0.8), null, count]}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <meshStandardMaterial
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        roughness={0.3}
        metalness={0.1}
      />
      <instancedBufferAttribute
        attach="attributes-color"
        count={count}
        array={colors}
        itemSize={3}
      />
    </instancedMesh>
  )
}

export default Seats