import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../../data/skillsData'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">
              Technical proficiencies and personal strengths I bring to every project
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                <span className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-3">
                  🔬
                </span>
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary-400 to-teal-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                <span className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mr-3">
                  💡
                </span>
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {skills.soft.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700"
                  >
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tools & Languages */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Tools */}
            <motion.div variants={itemVariants} className="card p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3 text-sm">
                  🛠️
                </span>
                Tools & Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div variants={itemVariants} className="card p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3 text-sm">
                  🌍
                </span>
                Languages
              </h3>
              <div className="space-y-4">
                {skills.languages.map((lang, index) => (
                  <motion.div key={lang.name} variants={itemVariants}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{lang.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">{lang.level}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
