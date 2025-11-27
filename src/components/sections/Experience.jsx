import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi'
import { experiences } from '../../data/experienceData'

const Experience = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  }

  const getTypeColor = (type) => {
    const colors = {
      Internship: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
      Research: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400',
      Leadership: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    }
    return colors[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">
              My journey through research, internships, and leadership roles
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-teal-400 to-primary-400" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-6">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="w-4 h-4 bg-gradient-to-br from-primary-400 to-teal-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="card p-6 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transition-colors"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(exp.type)}`}>
                          {exp.type}
                        </span>
                        <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm">
                          <FiCalendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                      </div>

                      {/* Role & Organization */}
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium mb-2">
                        <FiBriefcase className="w-4 h-4 mr-2" />
                        {exp.organization}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      <ul className="space-y-2 mb-4">
                        {exp.responsibilities.map((resp, rIndex) => (
                          <li key={rIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sIndex) => (
                          <motion.span
                            key={sIndex}
                            whileHover={{ scale: 1.05 }}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
