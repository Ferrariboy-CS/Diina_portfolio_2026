import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi'
import { fetchBlogPostBySlug } from '../services/contentful'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true)
      setError(null)
      
      const fetchedPost = await fetchBlogPostBySlug(slug)
      
      if (fetchedPost) {
        setPost(fetchedPost)
      } else {
        setError('Post not found')
      }
      
      setLoading(false)
    }
    
    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center"
      >
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link
          to="/blog"
          className="btn-primary"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>
      </motion.div>
    )
  }

  // Simple markdown-like rendering for the content
  const renderContent = (content) => {
    if (!content) return null
    
    // Split by lines and render paragraphs, headings, lists
    const lines = content.split('\n')
    const elements = []
    let currentList = []
    let inList = false

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      // Heading 2
      if (trimmedLine.startsWith('## ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
              {currentList}
            </ul>
          )
          currentList = []
          inList = false
        }
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
            {trimmedLine.substring(3)}
          </h2>
        )
      }
      // Heading 3
      else if (trimmedLine.startsWith('### ')) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
              {currentList}
            </ul>
          )
          currentList = []
          inList = false
        }
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3">
            {trimmedLine.substring(4)}
          </h3>
        )
      }
      // List item
      else if (trimmedLine.startsWith('- ')) {
        inList = true
        currentList.push(
          <li key={index}>{trimmedLine.substring(2)}</li>
        )
      }
      // Regular paragraph
      else if (trimmedLine.length > 0) {
        if (inList) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
              {currentList}
            </ul>
          )
          currentList = []
          inList = false
        }
        elements.push(
          <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {trimmedLine}
          </p>
        )
      }
    })

    // Close any remaining list
    if (inList && currentList.length > 0) {
      elements.push(
        <ul key="final-list" className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300">
          {currentList}
        </ul>
      )
    }

    return elements
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary-400 to-teal-500">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-9xl opacity-30">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-white hover:text-primary-200 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
              >
                <FiTag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-4">
            {post.title}
          </h1>

          {/* Date */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
            <FiCalendar className="w-4 h-4 mr-2" />
            {post.date}
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </motion.div>

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/30 dark:to-teal-900/30 rounded-2xl border border-primary-100 dark:border-primary-800"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              D
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">Diina N. Shatipamba</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fisheries & Marine Science Graduate</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 mb-20 text-center"
        >
          <Link
            to="/contact"
            className="btn-primary"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default BlogPost
