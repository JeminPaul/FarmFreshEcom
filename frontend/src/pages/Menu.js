// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

// const Menu = () => {
//   const {filterby} = useParams()
//   const productData=useSelector(state=>state.product.productlist)

//   const productDisplay=productData.filter(el=>el._id===filterby)[0]
//   console.log(productDisplay);

//   return (
//     <div>
//       <div className='w-full max-w-4xl bg-slate-400 m-auto'>
//         <div className=''>
//           <img src={productDisplay.image}/>
//         </div>
//         <div className=''></div>
//       </div>
//     </div>
//   )
// }

// export default Menu

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Allproducts from "../components/Allproducts";
// import { addcartitem } from "../redux/productslide";

// const Menu = () => {
//   const { filterby } = useParams();
//   const dispatch=useDispatch()
//   const productData = useSelector((state) => state.product.productlist);

//   // Filter product by ID
//   const productDisplay = productData.find((el) => el._id === filterby);

//   // Check if productDisplay exists before rendering
//   if (!productDisplay) {
//     return <div>No product found for the given ID.</div>;
//   }
//   const handleAddCartProduct = (e) => {
//     // e.stopPropagation();
//     dispatch(addcartitem(productDisplay))

//   };

//   return (
//     <div className="p-2 md:p-10  ">
//       <div className=" grid grid-cols-2 max-w-3xl m-auto bg-white">
//         <div className="max-w-sm  overflow-hidden w-full p-5">
//           {/* Render image if exists */}
//           {productDisplay.image && (
//             <img
//               src={productDisplay.image}
//               alt={productDisplay.name}
//               className="hover:scale-105 transition-all h-full"
//             />
//           )}
//         </div>
//         <div className="flex flex-col gap-2 mr-3 mb-5" >
//           <h3 className="font-bold text-center capitalize text-3xl md:text-4xl">
//             {productDisplay.name}
//           </h3>
//           <p className="text-center font-semibold text-2xl">
//             {productDisplay.category}
//           </p>
//           <p className="text-center font-bold md:text-2xl">
//             <span className="text-red-600">₹</span>
//             <span>{productDisplay.price}</span>
//           </p>
//           <div className="flex gap-4 justify-center items-center ">
//             <button className="bg-red-500 py-1 my-2 px-2 rounded font-semibold hover:bg-red-700 min-w-[100px]">
//               Buy-Now
//             </button>
//             <button className="bg-yellow-500 py-1 my-2 px-2 rounded font-semibold hover:bg-red-500 min-w-[100px]">
//               Add-cart
//             </button>
//           </div>
//           <div className="">
//             <p className=" font-bold">
//               Descrption :
//               <p className="text-sm text-slate-600">
//                 {productDisplay.description}
//               </p>
//             </p>
//           </div>
//         </div>
//       </div>
//       <Allproducts heading={"Related Products"}/>
//     </div>
//   );
// };

// export default Menu;



import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Allproducts from "../components/Allproducts";
import { addcartitem } from "../redux/productslide";

const Menu = () => {
  const { filterby } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productlist);

  // Filter product by ID
  const productDisplay = productData.find((el) => el._id === filterby);

  // Check if productDisplay exists before rendering
  if (!productDisplay) {
    return <div>No product found for the given ID.</div>;
  }

  const handleAddCartProduct = () => {
    // Dispatch action to add item to the cart
    dispatch(addcartitem(productDisplay));
  };

  return (
    <div className="p-2 md:p-10">
      <div className="grid grid-cols-2 max-w-3xl m-auto bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          {/* Render image if exists */}
          {productDisplay.image && (
            <img
              src={productDisplay.image}
              alt={productDisplay.name}
              className="hover:scale-105 transition-all h-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 mr-3 mb-5">
          <h3 className="font-bold text-center capitalize text-3xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="text-center font-semibold text-2xl">
            {productDisplay.category}
          </p>
          <p className="text-center font-bold md:text-2xl">
            <span className="text-red-600">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-4 justify-center items-center">
            <button className="bg-red-500 py-1 my-2 px-2 rounded font-semibold hover:bg-red-700 min-w-[100px]">
              Buy-Now
            </button>
            <button
              className="bg-yellow-500 py-1 my-2 px-2 rounded font-semibold hover:bg-red-500 min-w-[100px]"
              onClick={handleAddCartProduct} // Call handleAddCartProduct on click
            >
              Add-cart
            </button>
          </div>
          <div className="">
            <p className="font-bold">
              Descrption :
              <p className="text-sm text-slate-600">
                {productDisplay.description}
              </p>
            </p>
          </div>
        </div>
      </div>
      <Allproducts heading={"Related Products"} />
    </div>
  );
};

export default Menu;

