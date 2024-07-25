import { useState } from "react";
import React from "react";
import loginimage from "../images-prjct-1/login-page1.gif";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userslice";

function Login() {
  const [showpassword, setshowpassword] = useState(false);
  const [data, setdata] = useState({
    Email: "",
    password: "",
    image:""
  });
  
  const navigate=useNavigate()
 const userData= useSelector(state=>state)
 console.log(userData.user);

 const dispatch=useDispatch()




  const handlepassword = () => {
    setshowpassword((preve) => !preve);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
   const handleuploadprofile= async(e)=>{
      console.log(e.target.files[0]);
    const data=await imagetobase64(e.target.files[0])
   console.log(data);

   setdata((preve)=>{
      return{
       ...preve,
        image:data
      }
   })

   }

   const handleLogin = async (e) => {
    
    e.preventDefault();

    const { Email, password } = data;
    console.log(Email, password);
    if (Email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/Login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message)
      if(dataRes.alert){
        dispatch(loginRedux (dataRes))
        setTimeout(()=>{
          navigate("/")
        },1000)
      
      }
      console.log(userData);
    } else {
      alert("some thing went wrong");
    }
  };
  return (
    <div>
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          {/* <img src={loginimage} className="w-full h-full" /> */}
          <img src={data.image?data.image:loginimage}/>
        </div>

        <label htmlFor="profile-image">
        <div className="text-red-500 underline text-sm cursor-pointer  hover:text-blue-600">
          </div>
          <input type={"file"} id="profile-image" accept="image/*" className="hidden" onChange={handleuploadprofile}/>
          </label>

        <form onSubmit={handleLogin}>
          <label htmlFor="Email">Email</label>
          <input
            type={"Email"}
            id="Email"
            name="Email"
            placeholder="@gmail.com"
            className="mt-1 mb-2 w-full bg-slate-300 px-1 py-1 rounded  focus-within:outline-blue-500"
            value={data.Email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-1 py-1 rounded bg-slate-300  focus-within:outline-blue-500 outline-none">
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="enter your password"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handlepassword}
            >
              {showpassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>
          <button
          type="submit"
          className="w-full max-w-[100px] m-auto mt-5 rounded-full text-center text-white bg-green-700 hover:bg-blue-600 cursor-pointer "
        >
          Log-In
        </button>
        </form>
      

        <p className="text-sm mt-3">
          Create New Account...
          <Link to={"/Signup"} className="text-red-500 underline mt-1">
            Sign-Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
