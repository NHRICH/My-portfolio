import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GlowingParticlesProps {
  count: number
  size?: number
  color?: string
  area?: number
  speed?: number
}

const GlowingParticles = ({
  count,
  size = 0.1,
  color = '#ffd700',
  area = 10,
  speed = 0.2
}: GlowingParticlesProps) => {
  const points = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * area
      positions[i3 + 1] = (Math.random() - 0.5) * area
      positions[i3 + 2] = (Math.random() - 0.5) * area
    }
    
    return positions
  }, [count, area])
  
  const particlesAnimation = useRef({
    speeds: Array(count)
      .fill(0)
      .map(() => Math.random() * speed * 0.5),
    rotationSpeeds: {
      x: Math.random() * 0.01 - 0.005,
      y: Math.random() * 0.01 - 0.005,
      z: Math.random() * 0.01 - 0.005
    }
  })
  
  useFrame((state, delta) => {
    if (!points.current) return
    
    const positions = points.current.geometry.attributes.position.array as Float32Array
    
    // Animate each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Apply a unique sine movement to each particle
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * particlesAnimation.current.speeds[i] * delta
      
      // Wrap particles when they move too far
      for (let j = 0; j < 3; j++) {
        const axis = i3 + j
        if (positions[axis] > area / 2) positions[axis] = -area / 2
        if (positions[axis] < -area / 2) positions[axis] = area / 2
      }
    }
    
    // Rotate the entire particle system
    points.current.rotation.x += particlesAnimation.current.rotationSpeeds.x
    points.current.rotation.y += particlesAnimation.current.rotationSpeeds.y
    points.current.rotation.z += particlesAnimation.current.rotationSpeeds.z
    
    // Update the geometry
    points.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default GlowingParticles 