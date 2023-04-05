import React, { useContext, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBed,faPlane,faCar,faTaxi,faCalendarDays,faPerson } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';


const Header = ({type}) => {
  const [openDate,setOpenDate] = useState(false)
  const [openOptions,setOpenOptions] = useState(false)

  const [destination,setDestination] = useState("")

  const {user} = useContext(AuthContext)

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [options, setOptions] = useState(
    {
     adults:1,
     children:0,
     room:1
    }
  );

  const navigate = useNavigate()

  const handleOption = (name,operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]: operation ==='i'? options[name]+1 : options[name]-1
      }
    })

  }

  const { dispatch } = useContext(SearchContext)

  const handleSearch = ()=>{
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels",{state:{ destination,dates,options}})

  }
  return (
    <div className='bg-blue-900 text-white flex justify-center relative'>
        <div className={type==="list" ? "w-full max-w-5xl mt-5 mr-0 mb-0 ml-0":"w-full max-w-5xl mt-5 mr-0 mb-20 ml-0"}>
          <div className='flex gap-10 mb-12 '>
            <div className='flex items-center gap-3 border p-2.5 rounded-2xl'>
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rentals</span>
            </div>
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon icon={faBed} />
              <span>Attraction</span>
            </div>
            <div className='flex items-center gap-3'>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          { type !=="list" &&
           <>
            <h1 className='text-3xl font-bold'>A lifetime of discount? It's Genius</h1>  
            <p className='my-5 mx-0'>Get rewards for your travel - unlock instant saving of 10% or more with a free tienkbooking account</p>

            {!user && <button className='bg-blue-500 font-bold p-2.5'>Sign in / Register</button>}

            <div className='bg-white border-2 border-yellow-400 flex items-center 
                   justify-around py-2.5 rounded-md absolute -bottom-5 w-full max-w-5xl'>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faBed} className='text-gray-300'/>
                <input type="text" name="" placeholder='Where are you going?'
                  className='outline-none text-black' onChange={(e)=>setDestination(e.target.value)} />
              </div>
              <div className='flex items-center gap-2 z-20'>
                <FontAwesomeIcon icon={faCalendarDays} className='text-gray-300'/>
                <span onClick={()=>setOpenDate(!openDate)}className='text-gray-400 cursor-pointer'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
                
                { openDate && 
                <DateRange
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates} className='absolute top-12'/>
                }
                

              </div>
              <div className='flex items-center gap-2 z-20'>
                <FontAwesomeIcon icon={faPerson} className='text-gray-300'/>
                <span onClick={()=>setOpenOptions(!openOptions)} className='text-gray-400 cursor-pointer'>{`${options.adults} adult . ${options.children} children .${options.room } room`} </span>
                {

              openOptions &&
                <div className='absolute top-12 bg-white text-gray-500 border-4 shadow-md'>
                  <div className='w-60 flex justify-between m-2.5'>
                    <span>Adult</span>
                    <div className='flex items-center gap-2.5 text-xs text-black'>
                        <button disabled={options.adults<=1} className='w-8 h-8 border border-blue-500 text-blue-500 disabled:cursor-not-allowed' onClick={()=>handleOption('adults','d')}>-</button>
                        <span>{options.adults}</span>
                        <button className='w-8 h-8 border border-blue-500 text-blue-500' onClick={()=>handleOption('adults','i')}>+</button>
                    </div>
                  </div>
                  <div className='w-60 flex justify-between m-2.5'>
                    <span>Children</span>
                    <div className='flex items-center gap-2.5 text-xs text-black'>
                        <button disabled={options.children<=0} className='w-8 h-8 border border-blue-500 text-blue-500 disabled:cursor-not-allowed' onClick={()=>handleOption('children','d')}>-</button>
                        <span>{options.children}</span>
                        <button className='w-8 h-8 border border-blue-500 text-blue-500' onClick={()=>handleOption('children','i')}>+</button>
                    </div>
                  </div>
                  <div className='w-60 flex justify-between m-2.5'>
                    <span>Room</span>
                    <div className='flex items-center gap-2.5 text-xs text-black'>
                        <button disabled={options.room<=1}className='w-8 h-8 border border-blue-500 text-blue-500 disabled:cursor-not-allowed' onClick={()=>handleOption('room','d')}>-</button>
                        <span>{options.room}</span>
                        <button className='w-8 h-8 border border-blue-500 text-blue-500' onClick={()=>handleOption('room','i')}>+</button>
                    </div>
                  </div>
                </div>
                }

              </div>
              <div>
                <button className='bg-blue-500 font-bold p-2.5' onClick={handleSearch}>Search</button>
              </div>
            </div>  
            </>
           }
        </div>
    </div>
  )
}

export default Header