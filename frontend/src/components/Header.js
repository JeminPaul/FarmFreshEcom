import React, { useState } from "react";
import logo from "../images-prjct-1/logo4.jpg";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {logoutRedux} from "../redux/userslice"
import toast from "react-hot-toast";

const Header = () => {
  const [ShowMenu, SetShowMenu] = useState(false);
const userData=useSelector((state)=>state.user)
console.log(userData.Email);

const dispatch=useDispatch()
  const handleShowMenu=()=>{
    SetShowMenu(preve=>!preve)
  }

  const handlelogout=()=>{
    dispatch(logoutRedux())
    toast("Log-out Succesfully")

  }
  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  const cartitemnumber= useSelector((state)=>state.product.cartitem)


  return (
    <header className="fixed shadow-md w-full  px-2 md:px-6 z-50 bg-black">
      <div className="flex justify-between">
        <Link to={""}>
          <div className="h-16">
            <img src={logo} className="h-full  overflow-hidden border-none rounded-3xl drop-shadow-md shadow-md" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" font-bold md:gap-6 text-base md:text-lg hidden md:flex text-white">
            <Link to={""}>Home</Link>
            <Link to={"menu/65c8e91f2177a5ac4aa34679"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-700 relative">
           <Link to={"Cart"} ><FaShoppingCart />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
              {cartitemnumber.length}
            </div>
            </Link>
          </div>
          <div className="text-2xl text-slate-700"onClick={handleShowMenu}>
            <div className="cursor-pointer w-7 h-7 rounded-full overflow-hidden drop-shadow items-center">
              {userData.image? <img src={userData.image} className="h-full w-full"/>:<FaUserCircle />}
            </div>
            {ShowMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.Email===process.env.REACT_APP_ADMIN_EMAIL&& <Link to={"Newproduct"} className="whitespace-nowrap cursor-pointer px-1">New Product</Link>}
                
                {userData.image?<p className="cursor-pointer text-white bg-gray-950 text-center" onClick={handlelogout}>logout({userData.FirstName})</p>:<Link to={"Login"} className="whitespace-nowrap cursor-pointer">Log-in</Link>}
             
                <nav className="text-base md:text-lg flex flex-col md:hidden font-bold">
            <Link to={""}className="px-2 py-1">Home</Link>
            <Link to={"menu/65c8e91f2177a5ac4aa34679"}className="px-2 py-1">Menu</Link>
            <Link to={"about"}className="px-2 py-1">About</Link>
            <Link to={"contact"}className="px-2 py-1">Contact</Link>
          </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
