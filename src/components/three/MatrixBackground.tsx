import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const MatrixSymbol = ({ position, color, size, speed }: { position: [number, number, number], color: string, size: number, speed: number }) => {
  const symbolRef = useRef<THREE.Mesh>(null)
  const symbol = useMemo(() => {
    return String.fromCharCode(Math.floor(Math.random() * 94) + 33)
  }, [])

  useFrame((state, delta) => {
    if (symbolRef.current) {
      symbolRef.current.position.y -= delta * speed
      
      // Reset position when it goes below the screen
      if (symbolRef.current.position.y < -10) {
        symbolRef.current.position.y = 10
        
        // Change the symbol when it resets
        const newSymbol = String.fromCharCode(Math.floor(Math.random() * 94) + 33)
        if (symbolRef.current.children[0] instanceof THREE.Mesh) {
          const textGeometry = symbolRef.current.children[0].geometry
          if (textGeometry.parameters && textGeometry.parameters.text !== newSymbol) {
            textGeometry.parameters.text = newSymbol
          }
        }
      }
    }
  })

  return (
    <mesh ref={symbolRef} position={position}>
      <Text
        color={color}
        fontSize={size}
        font="/src/assets/fonts/SourceCodePro-Regular.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </mesh>
  )
}

const MatrixBackground = () => {
  const symbolsCount = 200
  const symbols = useMemo(() => {
    return Array.from({ length: symbolsCount }).map((_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20, // x between -10 and 10
        (Math.random() - 0.5) * 20, // y between -10 and 10
        (Math.random() - 0.5) * 5 - 5, // z between -7.5 and -2.5 (behind scene)
      ] as [number, number, number],
      color: Math.random() > 0.8 ? '#ffd700' : '#00ff41', // 20% gold, 80% matrix green
      size: Math.random() * 0.2 + 0.1, // size between 0.1 and 0.3
      speed: Math.random() * 3 + 1, // speed between 1 and 4
    }))
  }, [])

  return (
    <group>
      {symbols.map((symbol) => (
        <MatrixSymbol
          key={symbol.id}
          position={symbol.position}
          color={symbol.color}
          size={symbol.size}
          speed={symbol.speed}
        />
      ))}
    </group>
  )
}

export default MatrixBackground 