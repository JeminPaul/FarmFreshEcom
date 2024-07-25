// import React from "react";
// import { MdAutoDelete } from "react-icons/md"

// const Cartproduct = ({ id, name, image, category, qty, total, price }) => {

//   return (
//     <div className="bg-slate-200 p-2 flex gap-3 rounded border border-slate-500">
//       <div className="p-3 bg-white rounded overflow-hidden">
//         <img src={image} className="h-30 w-40 object-cover" />
//       </div>
//       <div className="flex flex-col gap-2 mr-3 mb-5 w-full">
//         <h3 className="font-bold text-center capitalize text-lg md:text-xl">
//           {name}
//         </h3>

//         <p className="text-center font-semibold text-2xl">{category}</p>
//         <p className="text-center font-bold text-base">
//           <span className="text-red-600">₹</span>
//           <span>{price}</span>
//         </p>
//         <div className=" flex justify-between">
//         <div className="flex gap-4 justify-center items-center ml-2">
//           <button className="bg-red-500 py-2 my-2 px-3 rounded font-semibold hover:bg-yellow-500  ">
//             -
//           </button>
//           <p className="font-bold ">{qty}</p>
//           <button
//             className="bg-yellow-500 py-2 my-2 px-3 rounded font-semibold hover:bg-red-500 "
//             onClick="" // Call handleAddCartProduct on click
//           >
//             +
//           </button>
//         </div>

//         <div className=" flex items-center gap-2 font-bold">
//             <p>Total :</p>
//             <p>{total}</p>
//         </div>

//         </div>
//       </div>
//       <MdAutoDelete className="text-xl cursor-pointer hover:text-red-500"/>
//     </div>
//   );
// };

// export default Cartproduct;

import React from "react";
import { MdAutoDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletecartitem,increaseQty,decreaseQty} from "../redux/productslide";

const Cartproduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 p-2 flex flex-col md:flex-row gap-3 rounded border border-slate-500">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img
          src={image}
          className="h-30 w-full md:w-40 object-cover"
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-center capitalize text-lg md:text-xl">
          {name}
        </h3>
        <p className="text-center font-semibold text-2xl">{category}</p>
        <p className="text-center font-bold text-base">
          <span className="text-red-600">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="flex gap-4 justify-center items-center">
            <button className="bg-red-500 py-2 my-2 px-3 rounded font-semibold hover:bg-yellow-500"
            onClick={()=>dispatch(decreaseQty(id))}>
              -
            </button>
            <p className="font-bold ">{qty}</p>
            <button
              className="bg-yellow-500 py-2 my-2 px-3 rounded font-semibold hover:bg-red-500 "
              onClick={() =>dispatch(increaseQty(id))}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <p>Total :</p>
            <p>  <span className="text-red-600">₹</span> {total}</p>
          </div>
        </div>
      </div>
      <div
        className="text-2xl cursor-pointer hover:text-red-500"
        onClick={() => dispatch(deletecartitem(id))}
      >
        <MdAutoDelete />
      </div>
    </div>
  );
};

export default Cartproduct;
