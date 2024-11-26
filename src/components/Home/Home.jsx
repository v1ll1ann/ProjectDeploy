import React from 'react'
import Hero from './Hero/Hero'
import Featured from './EstateCount/Featured'
import EstateCard from './EstateCard/EstateCard'
import ShowAll from '../ShowAll/ShowAll'

const Home = () => {
  return (
    <>
    <Hero />
    <ShowAll/>
    <EstateCard />
    <Featured />
    </>
  )
}

export default Home