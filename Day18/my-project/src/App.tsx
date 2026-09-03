import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Philosophy from './components/Philosophy'

function App() {
  return (
    <div className="min-h-screen bg-ivory overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Philosophy />
    </div>
  )
}

export default App