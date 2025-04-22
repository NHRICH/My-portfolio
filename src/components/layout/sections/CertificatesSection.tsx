import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'prompt engineering',
    issuer: 'Coursera',
    date: 'March 2023',
    image: '/images/Coursera SV6M08W8NPTK_page-0001.jpg',
    description: 'Advanced prompt engineering techniques for ChatGPT, including context optimization, chain-of-thought prompting, and system role design.'
  },
  {
    id: 2,
    title: 'Premier Pro',
    issuer: 'Udemy',
    date: 'July 2023',
    image: '/images/UC-d9c120e2-606f-456c-8ef1-23ac4.jpg',
    description: 'Advanced video editing techniques in Adobe Premiere Pro, including transitions, effects, color grading and professional workflows.'
  },
  {
    id: 3,
    title: 'After Effects',
    issuer: 'Udemy',
    date: 'October 2023',
    image: '/images/UC-a7b05843-f3ac-49c1-9655-e1f76.jpg',
    description: 'Advanced video editing techniques in Adobe After Effects, including transitions, effects, color grading and professional workflows.'
  },
  {
    id: 4,
    title: 'Ai agent in python',
    issuer: 'Coursera',
    date: 'January 2024',
    image: '/images/Coursera P24OOUD3GKMY (2).jpg',
    description: 'Building intelligent AI agents and automation systems using Python, including natural language processing, machine learning integration, and autonomous decision-making capabilities.'
  }
]

const CertificatesSection = () => {
  const [activeCertificate, setActiveCertificate] = useState(0)
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: true
  })
  const [isPaused, setIsPaused] = useState(false)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  const slideDelay = 5000; // 5 seconds per slide

  const handleImageLoad = (id: number) => {
    setLoadingImages(prev => ({
      ...prev,
      [id]: false
    }))
  }

  const nextSlide = () => {
    setActiveCertificate(prev => (prev === certificates.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveCertificate(prev => (prev === 0 ? certificates.length - 1 : prev - 1))
  }

  // Set up auto-sliding
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        nextSlide()
      }, slideDelay)
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [isPaused])

  // Pause auto-sliding when hovering over the carousel
  const pauseSlider = (): void => setIsPaused(true)
  const resumeSlider = (): void => setIsPaused(false)

  return (
    <section id="certificates" className="section bg-secondary relative overflow-hidden">
      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Professional</span> Certificates
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Continuous learning and professional development credentials.
          </p>
        </motion.div>

        {/* Certificates Carousel */}
        <div 
          className="certificates-carousel relative mx-auto max-w-4xl"
          onMouseEnter={(): void => pauseSlider()}
          onMouseLeave={(): void => resumeSlider()}
        >
          <div className="certificate-holder relative h-[450px] mb-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className={`absolute w-full h-full transition-all duration-500 transform
                  ${index === activeCertificate ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: index === activeCertificate ? 1 : 0,
                  scale: index === activeCertificate ? 1 : 0.9,
                  zIndex: index === activeCertificate ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-secondary-light border border-primary bg-opacity-30 backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl h-full flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-2xl font-bold mb-2 text-primary">{cert.title}</h3>
                    <div className="flex items-center mb-4">
                      <span className="text-text-secondary">{cert.issuer}</span>
                      <span className="mx-2 text-primary">•</span>
                      <span className="text-text-secondary">{cert.date}</span>
                    </div>
                    <p className="text-text-secondary mb-6">{cert.description}</p>
                    <motion.a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-secondary px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-sm inline-block"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Certificate
                    </motion.a>
                  </div>
                  <div className="md:w-1/2 relative">
                    {loadingImages[cert.id] && index === activeCertificate && (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary-dark">
                        <div className="animate-pulse text-primary text-center">
                          <svg className="w-10 h-10 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"></path>
                          </svg>
                          <span>Loading certificate...</span>
                        </div>
                      </div>
                    )}
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-contain bg-white p-2"
                      onLoad={() => handleImageLoad(cert.id)}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 backdrop-blur-lg flex items-center justify-center">
                        <span className="text-primary font-bold">{cert.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3">
            {certificates.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCertificate ? 'bg-primary scale-125' : 'bg-gray-400'
                }`}
                onClick={() => setActiveCertificate(index)}
              ></button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between px-4 z-20">
            <motion.button
              className="w-10 h-10 bg-primary bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center text-primary"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.3)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                prevSlide();
                pauseSlider();
                setTimeout(resumeSlider, 5000);
              }}
            >
              &lt;
            </motion.button>
            <motion.button
              className="w-10 h-10 bg-primary bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center text-primary"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 215, 0, 0.3)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                nextSlide();
                pauseSlider();
                setTimeout(resumeSlider, 5000);
              }}
            >
              &gt;
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificatesSection