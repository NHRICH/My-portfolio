import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import AboutModel from '../../3d/AboutModel'

const AboutSection = () => {
  const [activePanel, setActivePanel] = useState(0)

  const aboutPanels = [
    {
      id: 0,
      title: 'Background',
      content: `Hi, I'm Nahom Merhatsyon, a passionate Full-Stack Developer, AI Prompt Engineer, and Video Editor with a deep interest in cutting-edge technologies. I specialize in creating immersive digital experiences that combine technical excellence with creative vision.`,
      icon: '👤'
    },
    {
      id: 1,
      title: 'Mission',
      content: `My mission is to push the boundaries of digital innovation by blending AI, 3D technologies, and high-performance development to create memorable user experiences that are both functional and visually stunning.`,
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Vision',
      content: `I aim to leverage my diverse skill set across development, AI, and video editing to pioneer new approaches to interactive media, making technology more human-centered and creatively expressive.`,
      icon: '✨'
    }
  ]

  const timelineEvents = [
    {
      year: '2022',
      title: 'Started working on myself after the war',
      description: 'Focused on self-improvement and personal growth after the war in my country'
    },
    {
      year: '2023',
      title: 'Video Editing Mastery',
      description: 'Developed expertise in storytelling, faceless content, and client video delivery'
    },
    {
      year: '2023',
      title: 'AI & Prompt Engineering',
      description: 'Dove deep into AI tools and became skilled in crafting powerful prompts'
    },
    {
      year: '2024',
      title: 'Launched AV Digital Marketing',
      description: 'Built a full-service agency focused on results-driven, AI-powered marketing for professionals like dentists'
    },
    {
      year: '2024',
      title: 'Built Personal Brand',
      description: 'Started building my own online presence by sharing knowledge in tech, business, and self-growth'
    },
    {
      year: '2025',
      title: '3D Portfolio & AI Projects',
      description: 'Developing a futuristic 3D website, AI tools, and scalable systems for clients and my brand'
    },
    {
      year: 'Now',
      title: 'Innovating at the Intersection',
      description: 'Combining web dev, AI, video editing, and business to create cutting-edge experiences'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="about" className="section bg-secondary-dark relative">
      <div className="container mx-auto z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">About</span> Me
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-primary mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="text-lg text-text-secondary max-w-2xl mx-auto">
            Full-Stack Developer, AI Prompt Engineer, and Video Editor passionate about creating immersive digital experiences.
          </motion.p>
        </motion.div>

        {/* Floating Panels */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-20">
          {aboutPanels.map((panel) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: panel.id * 0.2 }}
              className={`flex-1 bg-secondary-light border-2 ${
                activePanel === panel.id ? 'border-primary' : 'border-secondary-light'
              } p-6 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary`}
              onClick={() => setActivePanel(panel.id)}
            >
              <div className="text-4xl mb-4 text-primary">{panel.icon}</div>
              <h3 className="text-xl font-bold mb-3">{panel.title}</h3>
              <p className="text-text-secondary">{panel.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-10 text-center">
            My <span className="text-primary">Journey</span>
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary opacity-20"></div>

            {/* Timeline events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-12 ${
                    index % 2 === 0 
                      ? 'md:flex-row' 
                      : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2 text-center md:text-right flex flex-col items-center md:items-end">
                    <div className="bg-primary text-secondary px-4 py-2 rounded-full font-bold text-sm mb-2">
                      {event.year}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                    <p className="text-text-secondary">{event.description}</p>
                  </div>

                  <div className="relative h-full flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-primary"></div>
                  </div>

                  <div className="md:w-1/2">
                    {/* Empty div for layout on even items */}
                    {index % 2 === 0 && <div className="md:block hidden"></div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 3D About Model Container */}
      <div className="about-3d-container">
        <Suspense fallback={null}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ 
              position: [0, 0, 10],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{ 
              alpha: true,
              antialias: true,
              logarithmicDepthBuffer: true,
            }}
          >
            <AboutModel />
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
    </section>
  )
}

export default AboutSection 