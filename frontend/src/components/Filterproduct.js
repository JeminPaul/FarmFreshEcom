import React from 'react'
import { IoFilter } from "react-icons/io5";

const Filterproduct = ({category,onClick}) => {
  return (
   <div onClick={onClick}>
     <div className='text-2xl p-3 bg-yellow-500 rounded-full cursor-pointer'><IoFilter /></div>
     <p className='text-center font-medium my-1 capitalize'>{category}</p>
   </div>
  )
}

export default Filterproduct