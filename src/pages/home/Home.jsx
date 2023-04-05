import React from 'react'
import Featured from '../../components/Featured'
import FeaturedProperties from '../../components/FeaturedProperties'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import MailList from '../../components/MailList'
import NavBar from '../../components/NavBar'
import PropertyList from '../../components/PropertyList'

const Home = () => {
  return (
    <div>
        <NavBar/>
        <Header/>
        <div className='mt-12 flex flex-col items-center gap-7'>
          <Featured />
          <h1 className='text-2xl font-bold w-full max-w-5xl'>Browse by properties type</h1>
          <PropertyList />
          <h1 className='text-2xl font-bold w-full max-w-5xl'>Homes guests love</h1>
          <FeaturedProperties />
          <MailList/>
          <Footer/>
        </div>
    </div>
  )
}

export default Home