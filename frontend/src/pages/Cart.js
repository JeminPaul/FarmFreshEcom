import React from "react";
import { useSelector } from "react-redux";
import Cartproduct from "../components/Cartproduct";
import emptycartimage from "../images-prjct-1/emptycart.avif"

const Cart = () => {
  const productcartitem = useSelector((state) => state.product.cartitem);
  console.log(productcartitem);

  const totalprice = productcartitem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productcartitem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
   
    <div className="p-2 md:p-4">
      <h1 className="text-lg md:text-2xl font-bold text-slate-950">
        Your Cart-Items
      </h1>
      {productcartitem[0] ?

      <div className="my-4 flex gap-4">
        {/* Display cart items */}
        <div className="w-full max-w-2xl">
          {productcartitem.map((el) => {
            // console.log("Current element:", el);
            // console.log(el.id);
            return (
              <Cartproduct
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                price={el.price}
                category={el.category}
                qty={el.qty}
                total={el.total}
              />
            );
          })}
        </div>

        {/* total cart items */}
        <div className="w-full max-w-md bg-white ml-auto">
          <h2 className="bg-red-500 text-white p-2 text-lg font-bold">
            Summary
          </h2>
          <div className="flex w-full py-2 text-lg border-b">
            <p>TotalQty :</p>
            <p className="ml-auto w-32 font-bold">{totalQty}</p>
          </div>
          <div className="flex w-full py-2 text-lg border-b">
            <p>Total Price:</p>
            <p className="ml-auto w-32 font-bold">
              {" "}
              <span className="text-red-600">₹</span>
              {totalprice}
            </p>
          </div>
          <button className="bg-red-500 w-full font-bold text-white rounded-full p-1 ">
            Payment
          </button>
        </div>
      </div>
      :
      <>
      <div className="flex justify-center items-center flex-col ">
        <img src={emptycartimage} className="w-full max-w-sm"/>
        <p className="text-2xl font-bold text-red-500 mt-3">Your Cart Is Empty</p></div></>
    }
    </div>
    
    </>
  );
};

export default Cart;
