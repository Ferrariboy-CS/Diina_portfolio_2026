import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://linkedin.com/in/diina-shatipamba', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:diinashatipamba@gmail.com', label: 'Email' },
  ]

  const quickLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Wave decoration */}
      <div className="relative">
        <svg
          className="w-full h-12 md:h-16 text-gray-900"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="font-display font-semibold text-lg">Diina Shatipamba</span>
            </div>
            <p className="text-gray-400 text-sm">
              Fisheries & Marine Science Graduate passionate about sustainable marine resource management and conservation.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FiMapPin className="w-4 h-4" />
              <span>Okahandja, Namibia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
            <a
              href="mailto:diinashatipamba@gmail.com"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              diinashatipamba@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center">
              © {currentYear} Diina Shatipamba. Made with <FiHeart className="mx-1 text-red-500" /> in Namibia
            </p>
            <p className="text-gray-500 text-xs">
              Fisheries & Marine Science | Conservation | Research
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
