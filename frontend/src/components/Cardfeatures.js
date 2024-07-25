

import React from "react";
import { Link } from "react-router-dom";
import { addcartitem,increaseQty } from "../redux/productslide";
import { useDispatch } from "react-redux";

const Cardfeatures = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch()
  const handleAddCartProduct = (e) => {
    // e.stopPropagation();
    dispatch(addcartitem({
      id : id,
    name : name,
    price : price,
    category : category,
    image : image
    }))
    

    // Add your add-to-cart functionality here
    // For now, let's just log a message
    console.log(`Product ${name} added to cart.`);
  };

  return (
    <div className="min-w-[250px] max-w-[250px] bg-red-100 hover:shadow-lg drop-shadow-lg cursor-pointer py-5 px-4">
      <Link
        to={`/menu/${id}`}
        onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
      >
        {image ? (
          <div className="h-25">
            <img
              src={image}
              className="h-48 w-full flex flex-col justify-center items-center hover:scale-105 transition-all rounded-full"
              alt={name}
            />
            <h3 className="font-bold text-center capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-center font-semibold">{category}</p>
            <p className="text-center font-bold">
              <span className="text-red-600">₹</span>
              <span>{price}</span>
            </p>
          </div>
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>{loading}</p>
          </div>
        )}
      </Link>
      <div className="flex justify-center items-center">
        <button
          className="w-full bg-yellow-500 py-1 my-2 px-2 rounded font-semibold hover:bg-red-500"
          onClick={handleAddCartProduct}
        >
          Add-cart
        </button>
      </div>
    </div>
  );
};

export default Cardfeatures;

