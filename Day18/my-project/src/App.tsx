import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import { sanityClient } from './sanity/client'
import {
  fetchPortfolioContent,
  type PortfolioContent,
} from './sanity/content'

function App() {
  const [content, setContent] = useState<PortfolioContent | null>(null)

  const reload = () =>
    fetchPortfolioContent()
      .then(setContent)
      .catch(() => setContent((prev) => prev ?? null))

  useEffect(() => {
    // Initial load
    reload()

    // Live updates: whenever a document we care about changes in the Studio,
    // re-fetch so the frontend reflects it immediately.
    const subscription = sanityClient
      .listen(
        '*[_type in ["project","experience","skill","certification","achievement","profile"]]',
      )
      .subscribe({
        next: () => reload(),
        error: () => {
          /* keep silently – reload on next change or manual refresh */
        },
      })

    return () => subscription.unsubscribe()
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

      <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
    </Routes>
  )
}

export default App