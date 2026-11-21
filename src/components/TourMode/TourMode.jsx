import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Html } from '@react-three/drei'
import { gsap } from 'gsap'

const TourMode = ({ onTourComplete }) => {
  const [isRunning, setIsRunning] = useState(false)
  const cameraRef = useRef()
  const tourSteps = useRef([
    { name: 'Aerial View', position: [0, 100, 200], target: [0, 25, 0], duration: 8 },
    { name: 'Stadium Exterior', position: [0, 80, 150], target: [0, 25, 0], duration: 8 },
    { name: 'Roof Structure', position: [0, 60, 120], target: [0, 45, 0], duration: 8 },
    { name: 'North Stand', position: [0, 50, 80], target: [0, 25, 50], duration: 8 },
    { name: 'East Stand', position: [80, 50, 0], target: [50, 25, 0], duration: 8 },
    { name: 'South Stand', position: [0, 50, -80], target: [0, 25, -50], duration: 8 },
    { name: 'West Stand', position: [-80, 50, 0], target: [-50, 25, 0], duration: 8 },
    { name: 'Football Pitch', position: [0, 70, 130], target: [0, 25, 0], duration: 8 },
    { name: 'VIP Skybox', position: [0, 60, 100], target: [0, 45, 45], duration: 8 },
    { name: 'Final Overview', position: [0, 120, 180], target: [0, 25, 0], duration: 8 }
  ])

  const startTour = () => {
    setIsRunning(true)
    if (!cameraRef.current) return

    const { camera } = cameraRef.current
    let currentIndex = 0

    const playNextStep = () => {
      if (currentIndex >= tourSteps.current.length) {
        setIsRunning(false)
        onTourComplete && onTourComplete()
        return
      }

      const step = tourSteps.current[currentIndex]

      gsap.timeline()
        .to(camera.position, {
          x: step.position[0],
          y: step.position[1],
          z: step.position[2],
          duration: step.duration / 2,
          ease: 'power2.inOut'
        })
        .to(camera.lookAt, {
          x: step.target[0],
          y: step.target[1],
          z: step.target[2],
          duration: step.duration / 2,
          ease: 'power2.inOut'
        }, '-')

      currentIndex++
      setTimeout(playNextStep, step.duration * 1000)
    }

    playNextStep()
  }

  const stopTour = () => {
    setIsRunning(false)
  }

  return {
    isRunning,
    startTour,
    stopTour,
    cameraRef
  }
}

export default TourMode