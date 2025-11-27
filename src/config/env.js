// Environment variables for external services
// Copy this file to .env and fill in your values

// EmailJS Configuration
// Get these from https://www.emailjs.com/
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

// Contentful CMS Configuration
// Get these from https://www.contentful.com/
export const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID || ''
export const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || ''
