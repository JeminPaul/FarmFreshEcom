import React from 'react'  
import { Link } from 'react-router-dom'

const HomeCard = ({name,image,price,category,loading,id}) => {
  return (
    <div className=' bg-red-100  rounded shadow-md p-2 min-w-[150px]'>
   {  name?(<> 
    <Link to={`/menu/${id}`}onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
   <div className='w-40 min-h-[170px]'>
        <img src={image} className='h-10px w-76 rounded-full'/>
      </div>
      <h3 className='font-bold text-center capitalize text-lg'>{name}</h3>
       <p className='text-center font-semibold'>{category}</p> 
       <p className='text-center font-bold'><span className='text-red-600'>₹</span><span>{price}</span></p>
       </Link>
       </>)
       :
      (<div className='flex justify-center items-center h-full'> <p>{loading}</p></div>)}
    </div>
  )
}

export default HomeCard