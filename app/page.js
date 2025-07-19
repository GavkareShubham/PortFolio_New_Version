'use client'
import React from 'react'
import Navbar from './component/navbar'
import Header from './component/header'
import About from './component/about'
import Services from './component/services'
import Work from './component/work'
import Contact from './component/contact'
import Footer from './component/footer'
const page = () => {
  return (
    <>
      <Navbar />
      <Header/>
      <About/>
      <Services/>
      <Work/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default page