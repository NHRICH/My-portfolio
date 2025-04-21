import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import TechnicModel from '../../3d/TechnicModel'

// Simplified skills list with only the three specified skills
const skills = [
  {
    id: 1,
    name: 'Full-Stack Developer',
    category: 'Development',
    proficiency: 90,
    icon: '💻',
    description: 'Building complete web applications from front-end interfaces to back-end systems with modern frameworks and technologies.'
  },
  {
    id: 2,
    name: 'AI Prompt Engineering',
    category: 'AI',
    proficiency: 95,
    icon: '🤖',
    description: 'Crafting effective prompts for generative AI models to produce optimal results.'
  },
  {
    id: 3,
    name: 'Video Editing',
    category: 'Media',
    proficiency: 85,
    icon: '🎬',
    description: 'Professional video editing with color grading, effects, and motion graphics.'
  }
]

const SkillsSection = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null)

  return (
    <section id="skills" className="section bg-secondary-dark relative overflow-hidden">
      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Technical</span> Skills
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A combination of technical excellence and creative vision across various domains.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Skills section - now on the left side */}
          <div className="md:w-1/2">
            <div className="flex flex-col justify-center gap-8">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: skill.id * 0.1 }}
                  className={`skill-card cursor-pointer bg-secondary-light p-6 rounded-lg border-2 
                    ${activeSkill === skill.id ? 'border-primary' : 'border-secondary-light'} 
                    hover:border-primary transition-all duration-300 shadow-lg`}
                  onClick={() => setActiveSkill(skill.id === activeSkill ? null : skill.id)}
                >
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{skill.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                      <div className="w-full bg-secondary-dark rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {activeSkill === skill.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="skill-detail mt-4 text-sm text-text-secondary"
                    >
                      <p>{skill.description}</p>
                      <p className="mt-2 text-primary">Proficiency: {skill.proficiency}%</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3D Model Container - on the right side */}
          <div className="md:w-1/2 h-[450px] technic-model-container">
            <Suspense fallback={null}>
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ 
                  position: [0, 0, 6],
                  fov: 40,
                  near: 0.1,
                  far: 1000
                }}
                gl={{ 
                  alpha: true,
                  antialias: true,
                  logarithmicDepthBuffer: true,
                  powerPreference: 'high-performance'
                }}
              >
                <color attach="background" args={['#1a1a1a']} />
                <fog attach="fog" args={['#1a1a1a', 5, 15]} />
                <TechnicModel />
              </Canvas>
            </Suspense>
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
            />
          </div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(skills.map(skill => skill.category))).map((category, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-secondary rounded-full text-primary border border-primary text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Matrix code background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="matrix-rain"></div>
      </div>
    </section>
  )
}

export default SkillsSection 