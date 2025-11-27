import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiUser, FiBookOpen, FiBriefcase, FiGrid, FiMail, FiFileText, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

const navLinks = [
  { name: 'Home', path: '/', icon: FiHome, isHash: false, sectionId: null },
  { name: 'About', path: 'about', icon: FiUser, isHash: true, sectionId: 'about' },
  { name: 'Education', path: 'education', icon: FiBookOpen, isHash: true, sectionId: 'education' },
  { name: 'Experience', path: 'experience', icon: FiBriefcase, isHash: true, sectionId: 'experience' },
  { name: 'Activities', path: 'activities', icon: FiGrid, isHash: true, sectionId: 'activities' },
  { name: 'Blog', path: '/blog', icon: FiFileText, isHash: false, sectionId: null },
  { name: 'Contact', path: '/contact', icon: FiMail, isHash: false, sectionId: null },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Only track sections on home page
      if (location.pathname !== '/') return
      
      const sections = ['about', 'education', 'experience', 'skills', 'activities']
      const scrollPosition = window.scrollY + 150 // Offset for navbar height
      
      // Check if at top of page (Hero section)
      if (window.scrollY < 300) {
        setActiveSection(null)
        return
      }
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Handle hash navigation after page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  const handleNavClick = (e, link) => {
    setIsOpen(false)
    
    if (link.isHash) {
      e.preventDefault()
      
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(link.path)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // Already on home, just scroll
        const element = document.getElementById(link.path)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // For regular routes, use navigate
      e.preventDefault()
      navigate(link.path)
      window.scrollTo(0, 0)
    }
  }

  const getHref = (link) => {
    if (link.isHash) {
      return `/#${link.path}`
    }
    return link.path
  }

  const isActive = (link) => {
    // For non-home pages (Blog, Contact)
    if (!link.isHash && link.path !== '/') {
      return location.pathname === link.path || location.pathname.startsWith(link.path + '/')
    }
    
    // For Home link
    if (link.path === '/' && !link.isHash) {
      return location.pathname === '/' && !activeSection
    }
    
    // For section links on home page
    if (link.isHash && location.pathname === '/') {
      return activeSection === link.sectionId
    }
    
    return false
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">D</span>
            </motion.div>
            <span className="font-display font-semibold text-lg hidden sm:block text-gray-800 dark:text-white">
              Diina Shatipamba
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive(link)
                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Theme Toggle - Desktop */}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={getHref(link)}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive(link)
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
