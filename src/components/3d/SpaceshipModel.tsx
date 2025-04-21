import { useRef, useState, useEffect, useMemo } from 'react'
import { 
  useGLTF, 
  useAnimations, 
  OrbitControls
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function SpaceshipModel() {
  const groupRef = useRef<THREE.Group>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { camera } = useThree()
  
  // Animation parameters
  const [animationParams] = useState({
    xPosition: -10, // Start from left side of screen
    speed: 0.065,    // Slightly increased speed
    verticalRotationSpeed: 0.02, // Speed of vertical rotation
    wobbleAmount: 0.03, // Reduced wobble
    wobbleSpeed: 0.3,   // Slowed wobble
    centerPoint: -2,    // Start rotation before center (shifted left)
    centerThreshold: 3, // Wider threshold for rotation
    loopCount: 0,       // Track number of loops
    isPaused: false,    // Pause state
    pauseTimer: 0,      // Timer for pause duration
    pauseDuration: 2,   // Pause duration in seconds
    maxLoops: 2,        // Maximum number of loops before stopping
    isComplete: false   // Flag for when animation is complete
  })
  
  // Load the model
  const { scene, animations } = useGLTF('/spaceship.gltf')
  
  // Position model lower
  const isMobile = window.innerWidth < 768
  // We'll control position through animation rather than initial position
  const initialPosition: [number, number, number] = [-10, isMobile ? -3 : -1, 0]; // Positioned much lower
  const modelScale: [number, number, number] = [1.2, 1.2, 1.2];

  // Prepare the ship model - runs only once thanks to useMemo
  const spaceshipScene = useMemo(() => {
    // Clone the scene to avoid modifying the cached original
    const clonedScene = scene.clone()
    
    // Apply settings to the loaded model
    clonedScene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // Enable shadows
        object.castShadow = true
        object.receiveShadow = true
        
        // Keep original materials
      }
    })
    
    return clonedScene
  }, [scene])

  useEffect(() => {
    if (spaceshipScene) {
      setModelLoaded(true)
    }
  }, [spaceshipScene])

  // Flying animation with vertical rotation and pause
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Stop animation if we've completed all loops
      if (animationParams.isComplete) {
        return;
      }
      
      // Handle pause state on second loop
      if (animationParams.isPaused) {
        animationParams.pauseTimer += delta;
        
        // Resume movement after pause duration
        if (animationParams.pauseTimer >= animationParams.pauseDuration) {
          animationParams.isPaused = false;
          animationParams.pauseTimer = 0;
        }
        
        // Don't update position while paused
        return;
      }
      
      // Update x position for left-to-right movement
      animationParams.xPosition += animationParams.speed * delta * 60;
      
      // Create boundaries based on viewport
      const rightBoundary = 10; // Move far right before resetting
      
      // Reset position when it reaches the right boundary
      if (animationParams.xPosition > rightBoundary) {
        animationParams.xPosition = -10;
        // Reset rotation when starting new cycle
        groupRef.current.rotation.set(0, Math.PI * 0.25, 0);
        
        // Increment loop counter
        animationParams.loopCount += 1;
        
        // Check if we've reached max loops
        if (animationParams.loopCount >= animationParams.maxLoops) {
          animationParams.isComplete = true;
          return;
        }
        
        // Pause at the left side on the second loop (loopCount is 1 after first complete loop)
        if (animationParams.loopCount === 1) {
          animationParams.isPaused = true;
        }
      }
      
      // Apply smooth flying motion with minor wobble
      const time = state.clock.getElapsedTime();
      
      // Apply x position - straight path
      groupRef.current.position.x = animationParams.xPosition;
      
      // Add very slight vertical wobble for flying effect
      groupRef.current.position.y = initialPosition[1] + 
        Math.sin(time * animationParams.wobbleSpeed) * animationParams.wobbleAmount;
        
      // Keep z position stable with minimal wobble
      groupRef.current.position.z = initialPosition[2] + 
        Math.cos(time * animationParams.wobbleSpeed * 0.7) * animationParams.wobbleAmount * 0.3;
      
      // Apply vertical rotation when approaching center (starts earlier now)
      const distanceFromCenter = Math.abs(animationParams.xPosition - animationParams.centerPoint);
      
      if (distanceFromCenter < animationParams.centerThreshold) {
        // Calculate rotation progress (0 to 1) based on distance from center
        const rotationProgress = 1 - (distanceFromCenter / animationParams.centerThreshold);
        
        // Apply vertical rotation (around z-axis) when near center
        // Maximum rotation at exact center, gradually reducing as it moves away
        const targetRotationZ = Math.PI * rotationProgress;
        
        // Smooth rotation transition
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          targetRotationZ,
          animationParams.verticalRotationSpeed * 10 * delta
        );
      } else {
        // Gradually return to normal orientation when away from center
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          0,
          animationParams.verticalRotationSpeed * 5 * delta
        );
      }
    }
  });

  return (
    <>
      {/* Basic lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={1} />
      
      {/* The spaceship model */}
      <group 
        ref={groupRef} 
        position={initialPosition} 
        rotation={[0, Math.PI * 0.25, 0]} // Initial orientation showing profile
        scale={modelScale}
      >
        <primitive object={spaceshipScene} />
      </group>
    </>
  )
}

// Pre-load the model
useGLTF.preload('/spaceship.gltf') 