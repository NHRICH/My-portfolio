import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingGeometryProps {
  position: [number, number, number]
  geometry: 'box' | 'sphere' | 'dodecahedron' | 'icosahedron' | 'octahedron' | 'tetrahedron'
  color: string
  scale?: number
  speed?: number
  distort?: number
  rotation?: [number, number, number]
}

const FloatingGeometry = ({ 
  position, 
  geometry, 
  color, 
  scale = 1, 
  speed = 1,
  distort = 0.3,
  rotation = [0.01, 0.01, 0]
}: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useRef(position)
  const initialY = useRef(position[1])
  const time = useRef(Math.random() * 100)

  useFrame((state, delta) => {
    time.current += delta * speed

    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = initialY.current + Math.sin(time.current) * 0.5
      
      // Constant rotation
      meshRef.current.rotation.x += delta * rotation[0] * speed
      meshRef.current.rotation.y += delta * rotation[1] * speed
      meshRef.current.rotation.z += delta * rotation[2] * speed
    }
  })

  const geometryMap = {
    box: <boxGeometry args={[1, 1, 1]} />,
    sphere: <sphereGeometry args={[1, 32, 32]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    tetrahedron: <tetrahedronGeometry args={[1, 0]} />
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      {geometryMap[geometry]}
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={distort}
        envMapIntensity={0.5}
        clearcoat={0.5}
        clearcoatRoughness={0.1}
        metalness={0.1}
        roughness={0.5}
      />
    </mesh>
  )
}

export default FloatingGeometry 