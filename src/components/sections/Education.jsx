import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiDownload, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi'
import { education, certifications } from '../../data/educationData'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">Education & Certifications</h2>
            <p className="section-subtitle">
              My academic journey and professional development
            </p>
          </motion.div>

          {/* Education Cards */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-8 flex items-center">
              <span className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-3">
                🎓
              </span>
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="card p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {edu.campus}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-8 flex items-center">
              <span className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mr-3">
                <FiAward className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </span>
              Certifications & Training
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert) => (
                <motion.a
                  key={cert.id}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group card p-5 border border-gray-100 dark:border-gray-700 cursor-pointer relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="text-3xl mb-3">{cert.icon}</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2 line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 text-xs font-medium mb-1">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs mb-3">
                      <FiCalendar className="w-3 h-3 mr-1" />
                      {cert.date}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                      {cert.description}
                    </p>
                    
                    {/* Download indicator */}
                    <div className="flex items-center text-primary-500 dark:text-primary-400 text-xs font-medium group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                      <FiDownload className="w-3 h-3 mr-1" />
                      View Certificate
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
