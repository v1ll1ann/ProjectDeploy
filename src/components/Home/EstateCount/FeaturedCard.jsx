import React from 'react'
import { featured } from '../../EstateList/data'

const FeaturedCard = () => {
  return (
    <>
    <div className="container grid5 mtop">
        {featured.map((items, index) => (
            <div key={index} className='box'>
                <img src={items.cover} alt='' />
                <h4>{items.name}</h4>
            </div>
        ))}
    </div>
    </>
  )
}

export default FeaturedCard
