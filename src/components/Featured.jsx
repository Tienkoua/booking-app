import React from 'react'
import useFetch from './hooks/useFetch'

const Featured = () => {

    const {data,loading,error} = useFetch("/hotels/countByCity?cities=Abidjan,madrid,london")
    console.log(data)
  return (
    <div className='w-full max-w-5xl flex justify-between gap-5 z-10'>

        { loading ? ("Loading please wait") : ( <>
        <div className='relative text-white rounded-xl overflow-hidden h-60'>
            <img src="https://t-cf.bstatic.com/xdata/images/city/540x270/972599.webp?k=eb236dce54c15c8a0f4636c0ce8de0d10b5d6a11ef2f46c1361d51bc62df228d&o=" 
             alt='' className='w-full h-full object-cover'/>
            <div className='absolute bottom-5'>
                <h1 className='text-3xl font-bold'>Abidjan</h1>
                <h2 className='text-2xl'>{data[0]} properties</h2>
            </div>
        
        </div>
        <div className='relative text-white rounded-xl overflow-hidden h-60'>
            <img src="https://t-cf.bstatic.com/xdata/images/city/540x270/613094.webp?k=f751e035ae2c0ac97263ed7d150bae607ffa17a88c55e81cec907941d6bb078b&o=" 
             alt='' className='w-full h-full object-cover'/>
            <div className='absolute bottom-5'>
                <h1 className='text-3xl font-bold'>Madrid</h1>
                <h2 className='text-2xl'>{data[1]} properties</h2>
            </div>
        
        </div>
        <div className='relative text-white rounded-xl overflow-hidden h-60'>
            <img src="https://t-cf.bstatic.com/xdata/images/city/540x270/968314.webp?k=0e0d712f666150594683eeeea60d7e3afdaab51286a9023f15f648ff3fbb0d6c&o=" 
             alt='' className='w-full h-full object-cover'/>
            <div className='absolute bottom-5'>
                <h1 className='text-3xl font-bold'>London</h1>
                <h2 className='text-2xl'>{data[2]} properties</h2>
            </div>
        
        </div></> )}
       
    </div>
  )
}

export default Featured