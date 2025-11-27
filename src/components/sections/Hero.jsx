import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { personalInfo, images, documents } from '../../data/personalData'

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary-200/30 dark:bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-3xl"
        />
        
        {/* Wave pattern */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-24 text-white dark:text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-6"
            >
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Hi, I'm{' '}
              <span className="text-gradient">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-4"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={documents.cv}
                download="Diina_Shatipamba_CV.pdf"
                className="btn-primary"
              >
                <FiDownload className="mr-2" />
                View CV
              </a>
              <Link
                to="/contact"
                className="btn-secondary"
              >
                <FiMail className="mr-2" />
                Contact Me
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { value: '2024', label: 'Graduate' },
                { value: '3+', label: 'Research Projects' },
                { value: '5+', label: 'Certifications' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Animated border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 via-teal-400 to-primary-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-white" />
              </motion.div>
              
              {/* Inner animated ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-4 border-dashed border-primary-200"
              />
              
              {/* Image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={images.hero}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl"
              >
                🐟
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl"
              >
                🌊
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-primary-500 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}

export default Hero
