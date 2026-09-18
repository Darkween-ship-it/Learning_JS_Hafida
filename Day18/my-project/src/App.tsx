import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import { sanityClient } from './sanity/client'
import {
  fetchPortfolioContent,
  type PortfolioContent,
} from './sanity/content'

function App() {
  const { hash, pathname } = useLocation()
  const [content, setContent] = useState<PortfolioContent | null>(null)

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash, pathname])

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
    <>
      <CustomCursor />
      <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-ivory overflow-hidden">
            <Navbar />
            <Hero profile={content?.profile} />
            <About profile={content?.profile} />
            <Projects projects={content?.projects} />
            <Experience experiences={content?.experiences} />
            <Skills skills={content?.skills} />
            <Achievements achievements={content?.achievements} />
            <Contact profile={content?.profile} />
          </div>
        }
      />

      <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
      </Routes>
    </>
  )
}

export default App