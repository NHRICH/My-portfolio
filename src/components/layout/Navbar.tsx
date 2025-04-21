import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  currentSection: string
}

const Navbar = ({ currentSection }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  // Sound effect for hover
  const playHoverSound = () => {
    const audio = new Audio('/src/assets/sounds/hover.mp3')
    audio.volume = 0.2
    audio.play().catch(e => console.error('Audio play failed:', e))
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary bg-opacity-80 backdrop-blur-md py-3' : 'py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="#home" 
            className="text-primary font-bold text-2xl font-code tracking-wider"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
          >
            N<span className="text-white">M</span>
          </a>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`relative text-sm tracking-wider uppercase font-semibold ${
                currentSection === item.id
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
              onMouseEnter={playHoverSound}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSection === item.id && (
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                  layoutId="navbar-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`w-6 h-0.5 bg-primary mb-1.5 transition-all ${
            menuOpen ? 'transform rotate-45 translate-y-2' : ''
          }`} />
          <div className={`w-6 h-0.5 bg-primary mb-1.5 transition-all ${
            menuOpen ? 'opacity-0' : ''
          }`} />
          <div className={`w-6 h-0.5 bg-primary transition-all ${
            menuOpen ? 'transform -rotate-45 -translate-y-2' : ''
          }`} />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-secondary-dark bg-opacity-90 backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`py-2 px-4 border-l-2 ${
                  currentSection === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                whileHover={{ x: 10, color: '#ffd700' }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar 