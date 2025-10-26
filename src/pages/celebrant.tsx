"use client"

import { useEffect, useState } from "react"
import { Heart, Sparkles, Star } from "lucide-react"

export default function BirthdayWish() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/thirtyfive.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />
      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-6 flex items-center justify-center gap-4 text-pink-300">
          <Heart className="h-10 w-10 drop-shadow-[0_0_8px_rgba(255,85,155,0.6)]" />
          <Sparkles className="h-10 w-10 drop-shadow-[0_0_8px_rgba(255,212,103,0.6)]" />
          <Star className="h-10 w-10 drop-shadow-[0_0_8px_rgba(151,71,255,0.6)]" />
        </div>
        <h1 className="text-4xl font-semibold tracking-widest text-white drop-shadow-lg sm:text-6xl md:text-7xl">
          Meet The Celebrant
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          Join us in celebrating this special day!
        </p>
      </div>
    </div>
  )
}
