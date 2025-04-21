import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// New video projects with YouTube Shorts links
const videoProjects = [
  {
    id: 1,
    title: 'car',
    description: 'A short video showcasing a car in motion, edited with dynamic cuts and transitions.',
    tags: ['Video Editing', 'After Effects', 'primerpro'],
    youtubeId: 'euu_a6t3X30',
    youtubeUrl: 'https://www.youtube.com/embed/euu_a6t3X30'
  },
  {
    id: 2,
    title: 'Motion Graphics Showcase',
    description: 'Demonstrating advanced motion graphics techniques with 3D elements and particle effects.',
    tags: ['Motion Graphics', '3D Animation', 'Visual Effects'],
    youtubeId: 'WE8pP3TwyJc',
    youtubeUrl: 'https://youtube.com/embed/WE8pP3TwyJc'
  },
  {
    id: 3,
    title: 'Pov Video edior and Gym Rat ',
    description: 'A POV video showcasing a gym rat\'s workout routine, edited with fast-paced cuts and upbeat music.',
    tags: ['Motion Graphics', 'primerpro', 'Visual Effects'],
    youtubeId: 'iv7ylSibRxE',
    youtubeUrl: 'https://www.youtube.com/embed/iv7ylSibRxE'
  },
  {
    id: 4,
    title: 'Sun dental clinic',
    description: 'A promotional video for a dental clinic',
    tags: ['Motion Graphics', '3D Animation', 'Visual Effects'],
    youtubeId: 'DILT3Zjke4M',
    youtubeUrl: 'https://www.youtube.com/embed/DILT3Zjke4M'
  }
]
//
// New component for video project cards with YouTube Shorts embeds
const VideoProjectCard = ({ project, index }: { project: typeof videoProjects[0], index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [embedError, setEmbedError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  // Handle lazy loading of YouTube embeds
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  // Handle YouTube embed errors
  useEffect(() => {
    if (isLoaded) {
      // Set a timeout to check if loading fails
      const timeout = setTimeout(() => {
        if (iframeRef.current) {
          try {
            // Check if iframe loaded correctly
            if (!iframeRef.current.contentWindow) {
              setEmbedError(true);
            }
          } catch (error) {
            setEmbedError(true);
          }
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  // Direct YouTube URL for fallback
  const directYoutubeUrl = `https://www.youtube.com/shorts/${project.youtubeId}`;

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full bg-secondary-light border-2 ${
        isHovered ? 'border-primary' : 'border-secondary-light'
      } rounded-lg overflow-hidden transition-all duration-300`}>
        {/* YouTube Shorts embed container */}
        <div className="aspect-[9/16] max-w-[325px] mx-auto relative bg-secondary-dark youtube-embed-container">
          {isLoaded && !embedError ? (
            <iframe 
              ref={iframeRef}
              src={`${project.youtubeUrl}?rel=0&showinfo=0&controls=1`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              onError={() => setEmbedError(true)}
            ></iframe>
          ) : embedError ? (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-secondary-dark p-4">
              <div className="text-primary mb-3">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p className="text-primary text-sm font-code text-center mb-4">YouTube embed couldn't load</p>
              <a 
                href={directYoutubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-secondary px-3 py-1 rounded-sm text-xs font-bold"
              >
                Open in YouTube
              </a>
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-secondary-dark">
              <div className="animate-pulse text-primary mb-3">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.05 13.05C3.05 7.81 7.3 3.55 12.54 3.55C17.78 3.55 22.04 7.81 22.04 13.05C22.04 18.29 17.78 22.55 12.54 22.55C7.3 22.55 3.05 18.29 3.05 13.05ZM10.54 17.05L16.54 13.05L10.54 9.05V17.05Z"/>
                </svg>
              </div>
              <p className="text-primary text-sm font-code">Loading YouTube...</p>
            </div>
          )}
        </div>
        
        {/* Project info */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-text-secondary text-sm mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-xs py-1 px-2 bg-secondary rounded-full text-primary border border-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsSection = () => {
  // No need to load external scripts for YouTube embeds
  useEffect(() => {
    // YouTube iframe API is automatically loaded by the browser
    return () => {
      // Clean up is optional
    };
  }, []);

  return (
    <section id="projects" className="section bg-secondary relative">
      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Video</span> Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A collection of my best video editing projects showcasing various styles and techniques.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videoProjects.map((project, index) => (
            <VideoProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://www.youtube.com/@nahomdev/shorts" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-transparent text-primary font-bold rounded-sm border-2 border-primary 
            hover:bg-primary hover:text-secondary transition-all duration-300 uppercase tracking-wider"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            View More on YouTube
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection 