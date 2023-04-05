import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faCircleXmark,faCircleArrowLeft,faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import MailList from '../../components/MailList'
import Footer from '../../components/Footer'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/Reserve'

function Hotel() {
  const location = useLocation()
  const hotel_id = location.pathname.split('/')[2]
  const {data,loading,error,reFetch} = useFetch(`/hotels/find/${hotel_id}`)

  const navigate = useNavigate()

  const [slidesNumber,setSlidesNumber] = useState(0)
  const [open,setOpen] = useState(false)
  const [openModal,setOpenModal] = useState(false)

  const { dates,options } = useContext(SearchContext)
  const {user} = useContext(AuthContext)
 
  const MILLISECONDS_PER_DAY = 1000*60*60*24;

  function dayDifference(date1,date2){
    const timeDiff = Math.abs(date2.getTime()-date1.getTime());
    const daysDiff = Math.ceil(timeDiff/ MILLISECONDS_PER_DAY);
    return daysDiff;
  }

  const days = dayDifference(dates[0].endDate,dates[0].startDate)

  const photos = [
    {
      src:'https://t-cf.bstatic.com/xdata/images/hotel/square200/326183386.webp?k=fd3d922f5fafb6b7d9445f0cdc39a66a80dd1b054509a0cc1bc9ffdf7358eae8&o=&s=1'
    },
    {
      src:'https://q-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o='
    },
    {
      src:'https://r-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o="'
    },
    {
      src:'https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o='
    },
    {
      src:'https://q-xx.bstatic.com/xdata/images/hotel/300x240/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o='
    }
  ];

  const handleOpen = (i)=>{
    setSlidesNumber(i)
    setOpen(true)
  }

  const handleMove = (direction)=>{
    let newSliderNumber;

    if(direction==='l'){
      newSliderNumber = slidesNumber === 0 ? 4 : slidesNumber - 1
    }else {
      newSliderNumber = slidesNumber === 4 ? 0 : slidesNumber + 1
    }

    setSlidesNumber(newSliderNumber)
  }

  const handleClick = ()=>{
    if(user){
      setOpenModal(true)
    }else{
      navigate('/login')
    }
  }

  return (
    <div>
      <NavBar />
      <Header type='list' />
      { loading ? ("Loading...") : (<div className='flex justify-center mt-5 flex-col items-center  '>

        { open && 
        <div className='sticky top-0 left-0 w-screen h-screen z-50 flex items-center bg-[#00000070]'>
          <FontAwesomeIcon icon={faCircleXmark} onClick={()=>setOpen(false)} className='absolute top-5 right-5 text-3xl text-gray-300 cursor-pointer'/>
          <FontAwesomeIcon icon={faCircleArrowLeft} onClick={()=>handleMove('l')} className='m-8 text-5xl text-gray-400 cursor-pointer '/>
          <div className='w-full h-full flex justify-center items-center'>
            <img src={data.photos[slidesNumber]} 
            alt="" 
            className='w-3/5 h-[80vh]'/>
          </div>
          <FontAwesomeIcon onClick={()=>handleMove('r')} icon={faCircleArrowRight} className='m-8 text-5xl text-gray-300 cursor-pointer'/>
        </div>}

        <div className='w-full max-w-5xl flex flex-col gap-2 relative'>
          <button onClick={handleClick}  className='absolute top-2.5 right-0 p-2.5 bg-blue-500 rounded-md text-white font-bold'>Reserve or Book Now!</button>
          <h1 className='text-2xl font-bold'>{data.name}</h1>
          <div className='text-xs flex items-center gap-2.5'>
            <FontAwesomeIcon icon={faLocationDot}/>
            <span >{data.address}</span>
          </div>
          <span className='text-blue-500 font-medium'>Excellent location - {data.distance}m from center</span>
          <span className='text-green-500 font-medium'>Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
          <div className='flex flex-wrap justify-between'>
            {data.photos?.map((photo,i)=>(
              <div className='w-1/3'>
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className='w-full object-cover'/>
              </div>
            ))}
          </div>
          <div className='flex justify-between gap-5 mt-5'>
            <div className='flex-1 grow-[3] shrink'>
              <h1 className='text-2xl font-bold'>{data.title}</h1>
              <p className='text-sm mt-5'>{data.desc}.</p>
            </div>
            <div className='flex-1 grow-[1] shrink bg-blue-100 p-5 flex flex-col gap-5'>
              <h1 className='text-lg text-gray-700 font-bold'>Perfect for a {days}-night stay </h1>
              <span className='text-sm'>Located in the heart of Abidjan, this property has an Excellent location score of 9.8</span>
              <h2 className='text-lg font-light'>
                <b>${days * data.cheapestPrice * options.room}</b>({days} nights)
              </h2>
              <button onClick={handleClick} className='bg-blue-500 rounded-md text-white font-bold py-2.5 px-5'>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>)}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={hotel_id}/>}
    </div>
  )
}

export default Hotel