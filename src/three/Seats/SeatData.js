import * as THREE from 'three'

/**
 * Generates seat positions and metadata for the stadium
 * Uses procedural generation for efficient data creation
 */

// Stadium dimensions
export const STADIUM_CONFIG = {
  OVAL_RADIUS_X: 80,
  OVAL_RADIUS_Y: 80,
  SEATING_DEPTH: 30,
  TIER_HEIGHT: 12,
  TIER_SPACING: 1,
  ROW_WIDTH: 4,
  BLOCK_SPACING: 1,
  SEAT_WIDTH: 1,
  SEAT_DEPTH: 0.8,
  SEAT_HEIGHT: 1
}

// Seat colors
export const SEAT_COLORS = {
  AVAILABLE: 0x1A4B8B,    // Royal blue
  HOVERED: 0xff6b35,     // Orange
  SELECTED: 0xffa500,    // Bright orange
  RESERVED: 0xffff00,    // Yellow
  SOLD: 0x6c757d,        // Grey
  PREMIUM: 0x8B1A1A      // Deep red
}

// Stand positions (angles)
export const STAND_ANGLES = {
  NORTH: { start: 0, end: Math.PI / 2, center: Math.PI / 4 },
  EAST: { start: Math.PI / 2, end: Math.PI, center: 3 * Math.PI / 4 },
  SOUTH: { start: Math.PI, end: 3 * Math.PI / 2, center: 5 * Math.PI / 4 },
  WEST: { start: 3 * Math.PI / 2, end: 2 * Math.PI, center: 7 * Math.PI / 4 }
}

/**
 * Calculates position on an ellipse for a seat
 */
export const getSeatPosition = (stand, tier, block, row, seat, seatsData) => {
  const angleRange = STAND_ANGLES[stand]
  if (!angleRange) return { x: 0, y: 0, z: 0 }

  // Row position in the bowl
  const tierHeight = STADIUM_CONFIG.TIER_HEIGHT * tier === 'Lower' ? 0 :
                     tier === 'Middle' ? STADIUM_CONFIG.TIER_HEIGHT :
                     2 * STADIUM_CONFIG.TIER_HEIGHT

  // Angle based on row within the stand
  const blocksInStand = Object.keys(seatsData.stands || {}).filter(s => s === stand).length || 4
  const blockIndex = Object.keys(seatsData.blocks?.[stand] || {}).indexOf(block)
  const rowsPerBlock = 30
  const rowProgress = row / rowsPerBlock
  const blockProgress = blockIndex / Math.max(1, blocksInStand - 1)

  // Calculate angle
  const startAngle = angleRange.start + (blockProgress * (angleRange.end - angleRange.start) * 0.5)
  const angle = startAngle + (rowProgress * (angleRange.end - angleRange.start) * 0.3)

  // Radius adjusts for tier
  const radius = STADIUM_CONFIG.OVAL_RADIUS_X - (tier === 'Lower' ? 5 : tier === 'Middle' ? 2 : 0)

  // Position on ellipse
  const x = Math.cos(angle) * radius + (blockIndex - 1.5) * 2
  const z = Math.sin(angle) * radius + (blockIndex - 1.5) * 2
  const y = tierHeight + Math.sin(row / rowsPerBlock * Math.PI) * 2

  return { x, y, z }
}

/**
 * Generate all seats data
 */
export const generateSeatsData = () => {
  const seats = {}
  const stands = ['North', 'South', 'East', 'West']
  const tiers = ['Lower', 'Middle', 'Upper']
  const blocks = {
    North: ['A', 'B', 'C', 'D'],
    South: ['E', 'F', 'G', 'H'],
    East: ['I', 'J', 'K', 'L'],
    West: ['M', 'N', 'O', 'P']
  }

  const basePrices = { Lower: 80, Middle: 120, Upper: 200 }

  stands.forEach(stand => {
    tiers.forEach(tier => {
      const blockList = blocks[stand] || []
      const tierRows = tier === 'Lower' ? 30 : tier === 'Middle' ? 25 : 20
      const baseSeats = tier === 'Lower' ? 80 : tier === 'Middle' ? 60 : 40

      blockList.forEach((block, blockIdx) => {
        for (let row = 1; row <= tierRows; row++) {
          const rowId = `${block}${row.toString().padStart(2, '0')}`
          seats[rowId] = {}

          const seatsInRow = baseSeats + (row % 8) * 2

          for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
            const position = getSeatPosition(stand, tier, block, row, seatNum)

            // Seat availability
            const rand = Math.random()
            const status = rand < 0.65 ? 'available' : rand < 0.85 ? 'reserved' : 'sold'

            // Pricing
            let price = basePrices[tier]
            if (seatNum % 12 === 0 || seatNum === seatsInRow) {
              price = Math.round(price * 1.6)
            } else if (seatNum % 6 === 0) {
              price = Math.round(price * 1.3)
            }

            const isPremium = seatNum % 12 === 0 || seatNum === seatsInRow

            seats[rowId][seatNum] = {
              id: `${stand}-${tier}-${block}-${row}-${seatNum}`,
              stand,
              tier,
              block,
              row,
              seat: seatNum,
              status,
              price,
              isPremium,
              x: position.x,
              y: position.y,
              z: position.z,
              color: status === 'available'
                ? (isPremium ? SEAT_COLORS.PREMIUM : SEAT_COLORS.AVAILABLE)
                : status === 'reserved'
                  ? SEAT_COLORS.RESERVED
                  : SEAT_COLORS.SOLD
            }
          }
        }
      })
    })
  })

  return {
    stands,
    tiers,
    blocks,
    seats,
    totalSeats: Object.values(seats).reduce((total, rows) => {
      return total + Object.values(rows).length
    }, 0)
  }
}

/**
 * Get seat by ID
 */
export const getSeatById = (seatsData, seatId) => {
  for (const rowId of Object.keys(seatsData.seats)) {
    if (seatsData.seats[rowId][seatId.split('-').pop()]) {
      return seatsData.seats[rowId][seatId.split('-').pop()]
    }
  }
  return null
}

/**
 * Get seats by stand
 */
export const getSeatsByStand = (seatsData, stand) => {
  const result = []
  Object.entries(seatsData.seats).forEach(([rowId, seats]) => {
    Object.entries(seats).forEach(([seatNum, seat]) => {
      if (seat.stand === stand) {
        result.push(seat)
      }
    })
  })
  return result
}

/**
 * Get camera position for seat view
 */
export const getSeatViewCamera = (seat) => {
  if (!seat) return null

  // Camera is positioned slightly above and in front of the seat, looking at the pitch
  const distance = 3
  const height = 1.2

  return {
    position: [
      seat.x,
      seat.y + height,
      seat.z - distance
    ],
    target: [
      seat.x,
      seat.y + 0.5,
      seat.z + STADIUM_CONFIG.SEATING_DEPTH * 2
    ],
    fov: 50
  }
}

// Pre-calculate seats data for performance
export const SEATS_DATA = generateSeatsData()