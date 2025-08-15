import React from 'react'
import Hero from '../components/Hero'
import PropertyRegistrationForm from './PropertyRegistrationForm'
import PropertyListings from '../components/PropertyListing'

const Home = () => {
  return (
    <div className='pt-16'>
       <Hero />
       {/* <PropertyRegistrationForm /> */}
       <PropertyListings />
    </div>
  )
}

export default Home
