import React from 'react'
import useFetch from './hooks/useFetch'

const FeaturedProperties = () => {
    const {data,loading,error} = useFetch("/hotels?featured=true&limit=4")

  return (
    <div className='w-full max-w-5xl flex justify-between gap-5'>
        {loading ? ("Loading...") : (
        <>
            {data.map((item)=>(
                <div className='flex-1 gap-2 flex flex-col' key={item._id}>
                    <img src={item.photos[0]}
                    alt="" className='w-full'/>
                    <span className='font-bold'>{item.name}</span>
                    <span className='font-light'>{item.city}</span>
                    <span className='font-medium'>Starting from ${item.cheapestPrice}</span>
                    {item.rating && <div>
                        <button className='bg-blue-700 text-white border-none p-1 m-2.5 font-bold'>8.9</button>
                        <span className='text-sm'>Excellent</span>
                    </div>}
                </div>

            ))}
        </>
        )}
        
    </div>
  )
}

export default FeaturedProperties