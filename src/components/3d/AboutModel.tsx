import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function AboutModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { camera } = useThree()
  
  // Load the model
  const { scene } = useGLTF('/about-model.gltf')
  
  // Position in center as shown in screenshot
  const initialPosition: [number, number, number] = [0, 0, 0]
  const modelScale: [number, number, number] = [1.2, 1.2, 1.2]
  
  // Clone scene to avoid modifying original
  useEffect(() => {
    if (scene) {
      // Prepare model
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
        }
      })
      
      setModelLoaded(true)
    }
  }, [scene])
  
  // Track scroll position for animation
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress specifically for the About section
      const aboutSection = document.getElementById('about')
      
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Different scroll states:
        // 1. Before about section: progress = 0
        // 2. During about section: progress = 0 to 1
        // 3. After about section: progress = 1
        
        if (rect.top > windowHeight) {
          // Not yet scrolled to about section
          setScrollProgress(0)
        } else if (rect.bottom < 0) {
          // Scrolled past about section
          setScrollProgress(1)
        } else {
          // Inside about section - calculate progress
          const sectionVisibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
          const sectionHeight = rect.height
          const progress = 1 - (sectionVisibleHeight / sectionHeight)
          setScrollProgress(progress)
        }
      }
    }
    
    // Set initial scroll position
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Animate based on scroll position
  useFrame(() => {
    if (groupRef.current && modelLoaded) {
      // Move down as user scrolls down the about section
      // Start at center (y=0) and move down to y=-5 when section is complete
      groupRef.current.position.y = THREE.MathUtils.lerp(
        0, // Starting position (center)
        -5, // Ending position (lower)
        scrollProgress // Progress based on scroll
      )
      
      // Rotate back when scrolling up
      const targetRotation = scrollProgress < 0.5 ? 0 : Math.PI * 2 * (scrollProgress - 0.5) * 2
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.1 // Smooth transition
      )
    }
  })
  
  return (
    <>
      {/* Lighting for the model */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* The about model */}
      <group 
        ref={groupRef} 
        position={initialPosition}
        scale={modelScale}
      >
        <primitive object={scene} />
      </group>
    </>
  )
}

// Pre-load the model
useGLTF.preload('/about-model.gltf') 