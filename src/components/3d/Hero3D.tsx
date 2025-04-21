import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  AdaptiveDpr, 
  Loader, 
  PerformanceMonitor,
  Preload,
  BakeShadows
} from '@react-three/drei'
// Temporarily comment out post-processing to debug black screen issue
// import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import SpaceshipModel from './SpaceshipModel'

export default function Hero3D() {
  const [loading, setLoading] = useState(true)
  const [perfTarget, setPerfTarget] = useState(1)
  const [enableEffects, setEnableEffects] = useState(false) // Disable effects while debugging
  
  // Handle responsive adjustments and performance optimizations
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      
      // On mobile, reduce the performance target to improve battery life
      if (isMobile) {
        setPerfTarget(0.8)
        setEnableEffects(false) // Disable effects on mobile for better performance
      } else {
        setPerfTarget(1)
        setEnableEffects(false) // Keep disabled while debugging
      }
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Animate in the spaceship with opacity effect
  const [opacity, setOpacity] = useState(1) // Set to 1 to ensure visibility
  
  useEffect(() => {
    if (!loading) {
      // Start the animation after loading completes
      const fadeIn = setTimeout(() => {
        setOpacity(1)
      }, 300)
      
      return () => clearTimeout(fadeIn)
    }
  }, [loading])
  
  // Create a proper Vector2 for ChromaticAberration
  const chromaticAberrationOffset = new THREE.Vector2(0.0005, 0.0005)
  
  return (
    <div 
      className="hero-3d-container"
      style={{ 
        opacity: 1, // Force opacity to 1
        transition: 'opacity 2s ease-in-out',
        background: 'transparent' // Make background transparent to not block text
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ 
          position: [0, 0, 15], // Move camera even further back to see flying motion
          fov: 45, // Narrower FOV for better perspective
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          alpha: true, // Enable transparency
          antialias: true,
          logarithmicDepthBuffer: true,
          powerPreference: 'high-performance',
        }}
        style={{ 
          background: 'transparent', // Transparent background
        }}
        onCreated={({ gl, scene }) => {
          setLoading(false)
          // Add ambient light to scene to ensure basic visibility
          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          scene.add(ambientLight);
          
          // Simplified settings for debugging
          gl.toneMapping = THREE.NoToneMapping;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          
          // Log scene for debugging
          console.log("Scene initialized:", scene);
        }}
      >
        <color attach="background" args={['#111']} />
        
        {/* Add a basic light setup for debugging */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <PerformanceMonitor
          onIncline={() => setPerfTarget(Math.min(perfTarget + 0.1, 1))}
          onDecline={() => setPerfTarget(Math.max(perfTarget - 0.1, 0.5))}
        >
          <Suspense fallback={null}>
            <SpaceshipModel />
            
            {/* Performance optimizations */}
            <AdaptiveDpr pixelated />
            <BakeShadows />
            <Preload all />
            
            {/* Temporarily comment out post-processing effects */}
            {/* {enableEffects && (
              <EffectComposer>
                <Bloom 
                  intensity={0.3} 
                  luminanceThreshold={0.6}
                  luminanceSmoothing={0.9}
                />
                <ChromaticAberration
                  offset={chromaticAberrationOffset}
                  blendFunction={BlendFunction.NORMAL}
                  radialModulation={true}
                  modulationOffset={0.5}
                />
                <Vignette
                  offset={0.5}
                  darkness={0.5}
                  blendFunction={BlendFunction.NORMAL}
                />
              </EffectComposer>
            )} */}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
      <Loader 
        containerStyles={{
          background: 'transparent',
          width: '100%',
          height: '5px',
          bottom: 0,
          top: 'auto',
          zIndex: 10
        }}
        barStyles={{
          height: '5px',
          backgroundColor: 'var(--primary)',
        }}
        dataStyles={{
          color: 'var(--primary)',
          fontSize: '14px',
          fontFamily: 'Source Code Pro, monospace',
          marginTop: '-40px',
          display: loading ? 'block' : 'none'
        }}
        dataInterpolation={(p) => `Loading Model... ${p.toFixed(0)}%`}
      />
    </div>
  )
} 