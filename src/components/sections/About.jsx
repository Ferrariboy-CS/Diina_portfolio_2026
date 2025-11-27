import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMapPin, FiGlobe, FiUser } from 'react-icons/fi'
import { personalInfo, aboutText, images } from '../../data/personalData'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Get to know me better - my background, passion, and what drives me
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary-200 to-teal-200 dark:from-primary-900 dark:to-teal-900 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary-300 dark:border-primary-700 rounded-2xl" />
                
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={images.about}
                    alt="Diina Shatipamba"
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert">
                {aboutText.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/50 dark:to-gray-800 rounded-xl border border-primary-100 dark:border-primary-800"
                >
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-3">
                    <FiUser className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Nationality</h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">{personalInfo.nationality}</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/50 dark:to-gray-800 rounded-xl border border-teal-100 dark:border-teal-800"
                >
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-3">
                    <FiMapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Location</h4>
                  <p className="text-teal-600 dark:text-teal-400 font-medium">{personalInfo.location}</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/50 dark:to-gray-800 rounded-xl border border-blue-100 dark:border-blue-800"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                    <FiGlobe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Languages</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {personalInfo.languages.join(', ')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
