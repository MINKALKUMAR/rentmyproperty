import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Property from './pages/Property'
import Contact from './pages/Contact'
import About from './pages/About'
import Footer from './components/Footer'
import PropertyRegistrationForm from './pages/PropertyRegistrationForm'
import TenantInformationForm from './pages/TenetInformationForm'
import AdminLogin from './pages/AdminLogin'

const App = () => {
  return (
    <div  className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/property" element={<Property />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/property-registration" element={<PropertyRegistrationForm />} />
        <Route path="/tenet-information" element={<TenantInformationForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
       </Routes>
       <Footer />
    </div>
  )
}

export default App
