import React from 'react'
import { Link } from 'react-router-dom'

const SearchItems = ({item}) => {
  return (
    <div className='border border-zinc-300 p-5 rounded-md flex justify-between gap-5 mb-5'>

        <img src={item.photos[0]} 
        alt="" 
        className='w-48 h-48 object-cover'/>
        <div className='flex flex-col gap-2.5 flex-1 grow-[2] shrink'>
            <h1 className='text-xl text-blue-500 font-bold'>{item.name}</h1>
            <span className='text-xs'>{item.distance}m from center</span>
            <span className='text-xs bg-green-500 text-white w-max p-1 rounded-md'>Free airport taxi</span>
            <span className='font-bold text-xs'>Studio Apartment with air conditioning</span>
            <span className='text-xs'>{item.desc}</span>
            <span className='text-xs text-green-500 font-bold'>Free cancellation</span>
            <span className='text-xs text-green-500'>You can cancel later, so lock in this great price</span>
        </div>
        <div className='flex-1 grow-[1] shrink flex flex-col justify-between'>
          {item.rating && <div className='flex justify-between'>
            <span className='font-medium'>Excellent</span>
            <button className='bg-blue-900 text-white p-1 font-bold'>{item.rating}</button>
          </div>}
          <div className='text-right flex flex-col gap-1'>
            <span className='text-2xl'>${item.cheapestPrice}</span>
            <span className='text-xs text-gray-500'>Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className='bg-blue-700 text-white font-bold py-2.5 px-1 rounded-md'>See availability</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default SearchItems