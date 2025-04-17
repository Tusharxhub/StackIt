"use client"

import { useState, useEffect } from "react"
import EntryPage from "@/components/entry-page"
import MainContent from "@/components/main-content"
import SkeletonLoader from "@/components/skeleton-loader"

export default function Home() {
  const [showEntry, setShowEntry] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasExited, setHasExited] = useState(false)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    setShowEntry(false)
  }

  const handleExit = () => {
    setHasExited(true)
    // In a real app, you might redirect to another site or show a goodbye message
  }

  if (hasExited) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Thank you for visiting!</h1>
          <p className="text-muted-foreground">You have exited the application.</p>
          <button
            onClick={() => setHasExited(false)}
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Application
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <main className="flex min-h-screen flex-col">
      {showEntry ? <EntryPage onContinue={handleContinue} onExit={handleExit} /> : <MainContent />}
    </main>
  )
}
