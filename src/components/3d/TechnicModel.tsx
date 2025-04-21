import { useRef, useState, useEffect } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function TechnicModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { viewport } = useThree()
  
  // Load the model
  const { scene } = useGLTF('/thechnic_model.gltf')
  
  // Better positioning for the model - smaller size
  const position: [number, number, number] = [0, -1.5, 0]  // Positioned much lower
  const modelScale: [number, number, number] = [1.5, 1.5, 1.5]  // Further reduced scale
  
  // Track scroll position for animation
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress specifically for the Skills section
      const skillsSection = document.getElementById('skills')
      
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate progress based on position in viewport
        if (rect.top > windowHeight) {
          // Not yet scrolled to skills section
          setScrollProgress(0)
        } else if (rect.bottom < 0) {
          // Scrolled past skills section
          setScrollProgress(1)
        } else {
          // Inside skills section - calculate progress
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
  
  // Clone scene to avoid modifying original
  useEffect(() => {
    if (scene) {
      // Prepare model
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true
          object.receiveShadow = true
          
          // Enhance materials if needed
          if (object.material) {
            object.material.needsUpdate = true
          }
        }
      })
      
      setModelLoaded(true)
    }
  }, [scene])
  
  // Animation based on scroll position
  useFrame((state) => {
    if (groupRef.current && modelLoaded) {
      const time = state.clock.getElapsedTime()
      
      // Base rotation that's always present
      const baseRotationY = Math.PI * 0.5
      
      // Calculate different animation states based on scroll
      if (scrollProgress < 0.3) {
        // Beginning of section: rotate and float up
        groupRef.current.rotation.y = baseRotationY + Math.sin(time * 0.2) * 0.3
        groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1
        groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
        
        // Float up slightly
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
      } 
      else if (scrollProgress < 0.7) {
        // Middle of section: more active rotation
        const scrollFactor = (scrollProgress - 0.3) / 0.4 // 0 to 1 within this range
        
        // Increasing rotation speed as we scroll down
        const rotationSpeed = 0.2 + scrollFactor * 0.4
        
        // Rotate more dramatically
        groupRef.current.rotation.y = baseRotationY + Math.sin(time * rotationSpeed) * 0.5
        groupRef.current.rotation.x = 0.1 + Math.sin(time * rotationSpeed * 0.8) * 0.2
        groupRef.current.position.y = position[1]
      }
      else {
        // End of section: slow down and change rotation axis
        const endScroll = (scrollProgress - 0.7) / 0.3 // 0 to 1 for end range
        
        // Gradually switch to z-axis rotation
        groupRef.current.rotation.y = baseRotationY - endScroll * Math.PI * 0.5
        groupRef.current.rotation.z = endScroll * Math.sin(time * 0.3) * 0.5
        
        // Move slightly down as we scroll to bottom
        groupRef.current.position.y = position[1] - endScroll * 0.3
      }
    }
  })
  
  return (
    <>
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#f0f0ff" />
      <directionalLight position={[0, -5, 0]} intensity={0.5} color="#ffecb3" />
      
      {/* Add a subtle spotlight to highlight the model */}
      <spotLight 
        position={[0, 8, 0]} 
        angle={0.4} 
        penumbra={0.5} 
        intensity={1.5} 
        castShadow 
      />
      
      {/* The technic model with improved positioning */}
      <group 
        ref={groupRef} 
        position={position}
        scale={modelScale}
      >
        <primitive object={scene} />
      </group>
    </>
  )
}

// Pre-load the model
useGLTF.preload('/thechnic_model.gltf') 