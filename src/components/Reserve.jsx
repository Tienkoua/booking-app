import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import useFetch from './hooks/useFetch'
import { SearchContext } from '../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({setOpen,hotelId}) => {
  const [selectedRooms,setSelectedRooms] = useState([])

  const {data,loading,error} = useFetch(`/hotels/rooms/${hotelId}`)

  const {dates} = useContext(SearchContext)

  const navigate = useNavigate()

  const getDatesInRange = (startDate,endDate) =>{
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates=[]

    while(date <= end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }

    return dates;
  }

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailabble = (roomNumber) =>{
    const isFound = roomNumber.unavailableDates.some((date)=> 
      alldates.includes(new Date(date).getTime())
      )

      return !isFound
  }

  const handleSelect = (e)=>{
    const checked = e.target.checked
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms,value] : selectedRooms.filter((item)=>item !== value))
  }

  const handleClick = async ()=>{
    try {
      await Promise.all(selectedRooms.map(roomId=>{
        const res = axios.put(`/rooms/availability/${roomId}`,{dates:alldates})
        return res.data
      }))

      setOpen(false)
      navigate('/')
    } catch (error) {
      
    }
  }

  //console.log(selectedRooms)

  return (
    <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-zinc-900/40'>
        <div className='bg-white p-5 relative'>
            <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} 
            className="absolute top-0 right-0 cursor-pointer"/>
            <span>Select your rooms:</span>

            {data.map(item=>(
              <div className='flex items-center gap-12 p-5'>
                <div className='flex flex-col gap-1.5'>
                  <div className="font-medium">{item.title}</div>
                  <div className='font-light'>{item.desc}</div>
                  <div className='text-xs'>Max People: <b>{item.maxPeople}</b> </div>
                  <div className='font-medium'>{item.price}</div>
                </div>

                <div className='flex flex-wrap gap-1.5 text-gray-400 text-xs'>

                  {item.roomNumbers.map(roomNumber=>(
                    <div className='flex flex-col'>
                      <label>{roomNumber.number}</label>
                      <input type="checkbox" 
                        value={roomNumber._id} 
                        onChange={handleSelect}
                        disabled={!isAvailabble(roomNumber)}
                      />
                  </div>
                ))}
                            
                </div>
              </div>
            ))}
             <button onClick={handleClick} 
                  className='py-2.5 px-5 bg-blue-500 text-white font-bold cursor-pointer rounded-md w-full mt-5'>
                    Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve