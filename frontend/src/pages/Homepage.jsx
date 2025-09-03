import React from 'react'
import ImageCarousel from '../components/ImageCarousel'

const Homepage = () => {
  return (
    <div>
        {/* Heading + Tagline */}
      <div className="w-full text-center py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-snug">
          Survey Department Circuit Bungalow Reservation System
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Your official platform for booking Survey Department circuit bungalows across Sri Lanka.
        </p>
      </div>
        <ImageCarousel/>
    </div>
  )
}

export default Homepage