import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  OrbitControls, 
  PerspectiveCamera,
  Stars
} from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

// Custom components
import MatrixBackground from '@/components/three/MatrixBackground'
import FloatingGeometry from '@/components/three/FloatingGeometry'
import GlowingParticles from '@/components/three/GlowingParticles'

interface MainSceneProps {
  currentSection: string
}

const MainScene = ({ currentSection }: MainSceneProps) => {
  const { gl, camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Define camera positions based on sections
  const cameraPositions = {
    home: [0, 0, 5],
    about: [-3, 2, 7],
    projects: [3, -1, 8],
    skills: [0, 3, 6],
    certificates: [-2, -2, 5],
    contact: [1, -1, 4]
  }

  // Animation for camera transition
  const { cameraPosition } = useSpring({
    cameraPosition: cameraPositions[currentSection as keyof typeof cameraPositions] || [0, 0, 5],
    config: { mass: 1, tension: 280, friction: 60 }
  })

  useEffect(() => {
    gl.setClearColor(new THREE.Color('#050505'))
  }, [gl])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of the entire scene
      groupRef.current.rotation.y += delta * 0.05
    }
    
    // Update camera position with spring animation
    if (camera && cameraPosition.animation.values) {
      const [x, y, z] = cameraPosition.get()
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.05)
    }
  })

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 20]} />
      
      <Environment preset="night" />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0}
        fade
        speed={0.5}
      />

      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Matrix background effect */}
        <MatrixBackground />
        
        {/* Floating geometry */}
        <FloatingGeometry 
          position={[0, 0, 0]} 
          geometry="icosahedron"
          color="#ffd700"
          scale={1.5}
          speed={0.5}
        />
        
        <FloatingGeometry 
          position={[-3, 2, -2]} 
          geometry="dodecahedron"
          color="#00ff41"
          scale={0.8}
          speed={0.7}
        />
        
        <FloatingGeometry 
          position={[3, -1, -1]} 
          geometry="octahedron"
          color="#ffd700"
          scale={1.2}
          speed={0.3}
        />
        
        {/* Particles */}
        <GlowingParticles 
          count={100} 
          size={0.05} 
          color="#ffd700"
          area={10}
        />
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffd700" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00ff41" />
      
      {/* Controls - disabled in production */}
      {process.env.NODE_ENV === 'development' && (
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
        />
      )}
    </>
  )
}

export default MainScene 