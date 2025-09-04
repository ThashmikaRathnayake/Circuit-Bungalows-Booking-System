import React from 'react'
import ImageCarousel from '../components/ImageCarousel'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <div className="w-full text-center py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-snug">
          Circuit Bungalow Reservation System
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Your official platform for booking Survey Department circuit bungalows across Sri Lanka.
        </p>
      </div>
        <ImageCarousel/>
        <Footer/>
    </div>
  )
}

export default Homepage