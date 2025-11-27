import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi'
import { fetchBlogPosts } from '../services/contentful'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [allTags, setAllTags] = useState(['All'])

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const fetchedPosts = await fetchBlogPosts()
      setPosts(fetchedPosts)
      setFilteredPosts(fetchedPosts)
      
      // Extract unique tags
      const tags = ['All', ...new Set(fetchedPosts.flatMap(post => post.tags))]
      setAllTags(tags)
      setLoading(false)
    }
    loadPosts()
  }, [])

  useEffect(() => {
    let result = posts

    // Filter by search term
    if (searchTerm) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by tag
    if (selectedTag !== 'All') {
      result = result.filter(post => post.tags.includes(selectedTag))
    }

    setFilteredPosts(result)
  }, [searchTerm, selectedTag, posts])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">
            Thoughts, insights, and stories from my journey in marine science and conservation
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-primary-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <FiTag className="inline-block w-3 h-3 mr-1" />
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="card border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transition-all group"
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 via-teal-50 to-primary-100 dark:from-primary-900 dark:via-teal-900 dark:to-primary-900 overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-30">📝</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Date */}
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Read More
                    <FiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}

        {/* CMS Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/30 dark:to-teal-900/30 rounded-2xl border border-primary-100 dark:border-primary-800 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            ✨ Want to add more blog posts?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This blog is powered by Contentful CMS. To add or edit posts, log in to your{' '}
            <a
              href="https://app.contentful.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Contentful dashboard
            </a>{' '}
            - no coding required!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Blog
