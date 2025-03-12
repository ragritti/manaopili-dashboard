"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"


export default function Loading({
  texts = ["Loading...", "Please wait...", "Almost there...", "Just a moment..."],
  interval = 2000,
  className = "",
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`} role="status">
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm font-medium">{texts[index]}</p>
      <span className="sr-only">Loading</span>
    </div>
  )
}