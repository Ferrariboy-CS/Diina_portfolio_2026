import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Education from '../components/sections/Education'
import Experience from '../components/sections/Experience'
import Skills from '../components/sections/Skills'
import Activities from '../components/sections/Activities'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Activities />
    </motion.div>
  )
}

export default Home
