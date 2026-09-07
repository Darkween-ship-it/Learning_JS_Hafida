import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import { fetchPortfolioContent, type Experience as ExperienceEntry, type Project } from './sanity/content'

function App() {
  const [content, setContent] = useState<{
    projects: Project[]
    experiences: ExperienceEntry[]
  } | null>(null)

  useEffect(() => {
    fetchPortfolioContent()
      .then(setContent)
      .catch(() => setContent({projects: [], experiences: []}))
  }, [])

  return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="min-h-screen bg-ivory overflow-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects projects={content?.projects} />
          <Experience experiences={content?.experiences} />
        </div>
      }
    />

    <Route
      path="/projects/:slug"
      element={<ProjectCaseStudy />}
    />
  </Routes>
  )
}

export default App