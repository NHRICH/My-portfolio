// // import { useRef } from 'react' - Removed unused import - Removed unused import
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Hero3D from '../../3d/Hero3D'

const HomeSection = () => {
  // Define animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1, 
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  // Scroll function to smoothly navigate to About section
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section id="home" className="section relative overflow-hidden flex items-center">
      <div className="container mx-auto z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-2 tracking-widest">WELCOME TO MY PORTFOLIO</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white">NAHOM</span>
              <span className="text-primary"> MERHATSYON</span>
            </h1>
            
            <div className="h-12 md:h-16 overflow-hidden font-code">
              <TypeAnimation
                sequence={[
                  'FULL-STACK DEVELOPER',
                  2000,
                  'AI PROMPT ENGINEER',
                  2000,
                  'VIDEO EDITOR',
                  2000,
                  'FULL-STACK DEVELOPER | AI PROMPT ENGINEER | VIDEO EDITOR',
                  4000,
                ]}
                wrapper="p"
                speed={50}
                style={{
                  fontSize: '1rem',
                  display: 'inline-block',
                  color: 'var(--matrix-green)',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                }}
                repeat={Infinity}
                cursor={true}
                className="text-sm md:text-lg animate-pulse"
              />
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <motion.a
                href="#about"
                className="inline-block px-8 py-3 bg-primary text-secondary font-bold rounded-sm border-2 border-primary 
                hover:bg-transparent hover:text-primary transition-all duration-300 uppercase tracking-wider"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                onClick={handleExploreClick}
              >
                Explore My Work
              </motion.a>
            </div>

            <motion.div 
              className="mt-16 animate-bounce mx-auto flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              <div className="w-6 h-10 rounded-full border-2 border-primary mx-auto">
                <div className="w-1.5 h-3 bg-primary rounded-full mx-auto mt-1.5 animate-pulse"></div>
              </div>
              <p className="text-xs mt-2 text-primary uppercase tracking-widest text-center">Scroll Down</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Spaceship */}
      <Hero3D />

      {/* Matrix Digital Rain Effect (CSS-only version as a fallback) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="matrix-rain">
          {Array.from({ length: 50 }).map((_, index) => (
            <div 
              key={index}
              className="matrix-column font-code text-matrix"
              style={{ 
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 2}s`,
                left: `${index * 2}%`
              }}
            >
              {Array.from({ length: 30 }).map((_, charIndex) => (
                <span 
                  key={charIndex}
                  style={{ 
                    animationDuration: '0.5s',
                    animationDelay: `${Math.random() * 5}s`
                  }}
                >
                  {String.fromCharCode(Math.floor(Math.random() * 94) + 33)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSection 