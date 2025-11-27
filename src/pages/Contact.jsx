import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck, FiAlertCircle, FiMapPin, FiPhone } from 'react-icons/fi'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/env'

const Contact = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({
    type: null, // 'success', 'error', 'loading'
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      })
      return
    }

    setStatus({ type: 'loading', message: 'Sending...' })

    try {
      // Check if EmailJS is configured
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
          EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // Demo mode - simulate success
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus({
          type: 'success',
          message: 'Message sent successfully! (Demo mode - configure EmailJS for real emails)',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        return
      }

      // Send email via EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.',
      })
    }
  }

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'diinashatipamba@gmail.com',
      href: 'mailto:diinashatipamba@gmail.com',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Okahandja, Namibia',
      href: null,
    },
  ]

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
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Have a question or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gradient-to-br from-primary-500 to-teal-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
              <p className="text-primary-100 mb-8">
                Feel free to reach out for research collaborations, opportunities, or just to connect!
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.label} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-primary-100 text-sm">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium hover:text-primary-200 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Decorative circles */}
              <div className="relative mt-12">
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* Quick response note */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3 text-green-600 dark:text-green-400">
                  ⚡
                </span>
                Quick Response
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                I typically respond within 24-48 hours. For urgent matters, please mention it in your message.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100 mb-6">
                Send a Message
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {/* Status Message */}
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 flex items-center ${
                    status.type === 'success'
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                      : status.type === 'error'
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      : 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                  }`}
                >
                  {status.type === 'success' && <FiCheck className="w-5 h-5 mr-2" />}
                  {status.type === 'error' && <FiAlertCircle className="w-5 h-5 mr-2" />}
                  {status.type === 'loading' && (
                    <div className="w-5 h-5 mr-2 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  )}
                  {status.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="mr-2" />
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
