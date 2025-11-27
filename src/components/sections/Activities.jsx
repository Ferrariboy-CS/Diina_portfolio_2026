import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { FiX, FiCalendar, FiMapPin, FiImage } from 'react-icons/fi'
import { events, eventCategories } from '../../data/eventsData'

const Activities = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory)

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const getCategoryColor = (category) => {
    const colors = {
      Research: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-700',
      Conservation: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-700',
      Training: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700',
      Achievement: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700',
      Community: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-700',
    }
    return colors[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      Research: '🔬',
      Conservation: '🌊',
      Training: '📚',
      Achievement: '🏆',
      Community: '🤝',
    }
    return icons[category] || '📌'
  }

  return (
    <section id="activities" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="section-title">Activities & Events</h2>
            <p className="section-subtitle">
              Highlights from fieldwork, research projects, and community involvement
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-12">
            {eventCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedEvent(event)}
                  className="card cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transition-colors group"
                >
                  {/* Image placeholder or actual image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 via-teal-50 to-primary-100 dark:from-primary-900 dark:via-teal-900 dark:to-primary-900 overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-primary-300 dark:text-primary-600">
                        <span className="text-5xl mb-2">{getCategoryIcon(event.category)}</span>
                        <FiImage className="w-8 h-8" />
                      </div>
                    )}
                    {/* Category badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">No events found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="relative h-64 bg-gradient-to-br from-primary-400 to-teal-500">
                {selectedEvent.image ? (
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl opacity-50">{getCategoryIcon(selectedEvent.category)}</span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getCategoryColor(selectedEvent.category)}`}>
                  {selectedEvent.category}
                </span>
                <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {selectedEvent.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {selectedEvent.date}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Activities
