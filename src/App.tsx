import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

// Components
import Navbar from '@/components/layout/Navbar'
import HomeSection from '@/components/layout/sections/HomeSection'
import AboutSection from '@/components/layout/sections/AboutSection'
import ProjectsSection from '@/components/layout/sections/ProjectsSection'
import SkillsSection from '@/components/layout/sections/SkillsSection'
import CertificatesSection from '@/components/layout/sections/CertificatesSection'
import ContactSection from '@/components/layout/sections/ContactSection'

// Three.js components
import MainScene from '@/scenes/MainScene'

const App = () => {
  const [currentSection, setCurrentSection] = useState('home')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id') || ''

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setCurrentSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="canvas-container">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            onCreated={() => setLoaded(true)}
          >
            <MainScene currentSection={currentSection} />
          </Canvas>
        </Suspense>
        <Loader 
          containerStyles={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
          innerStyles={{
            backgroundColor: 'var(--primary)',
          }}
          barStyles={{
            backgroundColor: 'var(--matrix-green)',
          }}
          dataStyles={{
            color: 'var(--primary)',
            fontFamily: 'Source Code Pro, monospace',
            fontSize: '14px',
          }}
          dataInterpolation={(p) => `Loading Nahom's Portfolio... ${p.toFixed(0)}%`}
        />
      </div>

      <div className="content-container">
        <Navbar currentSection={currentSection} />
        
        <main>
          <HomeSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificatesSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}

export default App 