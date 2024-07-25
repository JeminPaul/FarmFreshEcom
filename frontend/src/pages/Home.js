import React, { useEffect, useRef, useState } from 'react'
import{ useSelector} from"react-redux"
import HomeCard from '../components/HomeCard'
import Cardfeatures from '../components/Cardfeatures'
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Filterproduct from '../components/Filterproduct';
import Allproducts from '../components/Allproducts';







const Home = () => {
  const productData = useSelector(state => state.product.productlist);
  

  const homeproductcartlist=productData.slice(0,5)
const homeproductcartlistvegitables=productData.filter(el=>el.category==="vegitables",[])
// console.log(homeproductcartlistvegitables);
  const loadingarray= new Array(4).fill(null)
  const loadingarrayfeature= new Array(10).fill(null)

  const slideproductRef=useRef()

  const nextproduct=()=>{
    slideproductRef.current.scrollLeft +=200

  }
  const preveproduct=()=>{
    slideproductRef.current.scrollLeft -=200

  }





  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex py-2'>
      <div className='md:w-1/2'>
        <div className='flex gap-2 bg-green-400 w-36 px-2 items-center rounded-full'>
          <p className='text-sm font-bold'>Bike Delivery</p>
          <img src='https://www.iconpacks.net/icons/4/free-fast-food-delivery-bike-icon-12990-thumb.png' className='h-7'/>
        </div>
        <h2 className='text-4xl md:text-8xl font-bold py-3'> The Fastest delivery in <span className='text-red-500'>Your Home</span></h2>
        <p className='p-2 text-sm'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
         <button className="font-bold items-center bg-black text-white px-4 py-2 rounded-md hover:bg-red-500">Order-Now</button>
      </div>
      <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
        {
         homeproductcartlist[0]? homeproductcartlist.map(el=>{
            return(
              <HomeCard
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
              
              />
            )
          })
          :loadingarray.map((el,index)=>{
            return(
              <HomeCard
              key={index+"loading"}
              loading={"loading...."}
              
              />
            )
          })
        }
    
      </div>
   
      </div>
      <div className=''>
       <div className='flex w-full'> <h2 className='font-bold text-black -500 text-2xl mb-4'>Fresh Vegitables</h2>
       <div className='ml-auto mt-5 mr-3 flex gap-3'>
        <button onClick={preveproduct} className='bg-slate-300 hover:bg-green-500 text-lg p-1 rounded'><FcPrevious /></button>
        <button onClick={nextproduct} className='bg-slate-300 hover:bg-green-500 text-lg p-1 rounded'><FcNext /></button>
       </div>
       
       </div>
        <div className='flex gpa-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideproductRef}>
          {
            
            homeproductcartlistvegitables[0]?homeproductcartlistvegitables.map(el=>{
              return(
                <Cardfeatures
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}/>
                

              )
            })
            :loadingarrayfeature.map((el,index)=><Cardfeatures loading="loading...." key={index+"cartloading"}/>)
          }
          
        </div>
      </div>
      <Allproducts heading={"Your Products"}/>
    
    </div>
  )
}

export default Home