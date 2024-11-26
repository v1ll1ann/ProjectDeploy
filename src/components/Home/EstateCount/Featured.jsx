import React from 'react'
import './Featured.css'
import FeaturedCard from './FeaturedCard'
const Featured = () => {
  return (
    <>
    <section className='featured background'>
    <div className="featured-container">
        <FeaturedCard />
    </div>
    </section>
    </>
  )
}

export default Featured