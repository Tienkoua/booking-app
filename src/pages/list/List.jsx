import {React,useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import {format} from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItems from '../../components/SearchItems';
import useFetch from '../../components/hooks/useFetch';

const List = () => {
  const location = useLocation()
  
  const [destination,setDestination] = useState(location.state.destination)
  const [options,setOptions] = useState(location.state.options)  
  const [dates,setDates] = useState(location.state.dates)
  const [openDate,setOpenDate] = useState(false)
  const [min,setMin] = useState(undefined)
  const [max,setMax] = useState(undefined)


  const {data,loading,error,reFetch} = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 0}`)

  const handleClick = ()=>{
    reFetch()
  }

  return (
    <div>
      <NavBar/>
      <Header type="list" />
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-5xl flex gap-5'>
          <div className=' bg-yellow-500 p-3 rounded-xl sticky flex-1 grow-[1] shrink top-3 h-max'>
            <h1 className='text-2xl font-bold text-gray-700 mb-5'>Search</h1>
            <div className="flex flex-col gap-1 mb-2.5">
              <label className="text-sm" htmlFor="destination">Destination</label>
              <input className='h-8 border-none p-6 ' type="text" name='destination' placeholder={destination}/>
            </div>
            <div className="flex flex-col gap-1 mb-2.5">
              <label className="text-sm" htmlFor="checkin">Checkin-Date</label>
              <span  onClick={()=>{setOpenDate(!openDate)}}className='h-8 bg-white p-6  cursor-pointer'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
             
              { openDate && (
                <DateRange
              onChange={(item)=>setDates([item.selection])} 
              minDate={new Date()}
              ranges={dates}/>)}
            </div>
            <div>
              <label htmlFor="option">Options</label>
              <div className='p-2.5'>
                  <div className='flex justify-between mb-2.5 text-gray-500 text-sm'>
                    <span>Min price <small>per night</small></span>
                    <input type="number" onChange={e=>setMin(e.target.value)} name=''  className='w-12 border-1 rounded-sm'/>
                  </div>
                  <div className='flex justify-between mb-2.5 text-gray-500 text-sm'>
                    <span>Max price <small>per night</small></span>
                    <input type="number" onChange={e=>setMax(e.target.value)} name='' className='w-12 border-1 rounded-sm ' />
                  </div>
                  <div className='flex justify-between mb-2.5 text-gray-500 text-sm'>
                    <span>Adults</span>
                    <input type="number" min={1}  placeholder={options.adults} className='w-12 border-1 rounded-sm'/>
                  </div>
                  <div className='flex justify-between mb-2.5 text-gray-500 text-sm'>
                    <span>Children</span>
                    <input type="number" min={0} name='' placeholder={options.children} className='w-12 border-1 rounded-sm'/>
                  </div>
                  <div className='flex justify-between mb-2.5 text-gray-500 text-sm'>
                    <span>Room</span>
                    <input type="number" min={1} name='' placeholder={options.room} className='w-12 border-1 rounded-sm'/>
                  </div>
              </div>
              
            </div>
            <button onClick={handleClick} className='p-2.5 bg-blue-600 border-none text-white w-full font-medium'>Search</button>
          </div>
          <div className='flex-1 grow-[3] shrink'>

           {loading ? 'Loading..': <>

           {data.map((item)=>(

             <SearchItems item={item} key={item._id}/>
           ))}
           </>}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default List