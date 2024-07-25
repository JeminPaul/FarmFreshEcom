import React, { useState } from "react";
import loginsignupImage from "../images-prjct-1/animation-2.gif";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { Link,useNavigate } from "react-router-dom";
import Login from "./Login";
import { imagetobase64 } from "../utility/imagetobase64";
// import { BiSolidHide } from "react-icons/bi";
import { toast } from "react-hot-toast";

function Signup() {
  const Navigate=useNavigate()
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [data, setdata] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    password: "",
    confirmpassword: "",
    image:""
  });
  console.log(data);
  const handlepassword = () => {
    setshowpassword((preve) => !preve);
  };
  const handleconfirmpassword = () => {
    setshowconfirmpassword((preve) => !preve);
  };

  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setdata((preve)=>{
        return{
            ...preve,
            [name]:value
            
        }

    })
  }

  const handleuploadprofile= async(e)=>{
    // console.log(e.target.files[0]);
    const data=await imagetobase64(e.target.files[0])
    console.log(data);

    setdata((preve)=>{
      return{
        ...preve,
        image:data
      }
    })

  }

  console.log(process.env.REACT_APP_SERVER_DOMIN);
  
  const handlesubmit=async(e)=>{
     e.preventDefault()
    const{FirstName,Email,password,confirmpassword}=data
    if(FirstName&&Email&&password&&confirmpassword){  
        if(password===confirmpassword){

          const fetchData= await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/Signup`,{
            method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })

          const dataRes= await fetchData.json()
          console.log(dataRes);
        
            // alert(dataRes.message)
            toast(dataRes.message)
            if(dataRes.alert){
                Navigate("/Login")
            }
            
           
        }else{
            alert("wrong password")
        }

    }else{
        alert("please enter required fields")
    }

  }
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center'>Sign-Up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={data.image?data.image:loginsignupImage}className="w-full h-full" />      
        </div> 
        <label htmlFor="profile-image">
        <div className="text-red-500 underline text-sm cursor-pointer  hover:text-blue-600">
            <p className="text-center">Upload</p>
          </div>
          <input type={"file"} id="profile-image" accept="image/*" className="hidden" onChange={handleuploadprofile}/>
          </label>


        <form className="w-full py-5 flex flex-col" onSubmit={handlesubmit}>
          <label htmlFor="firstName">FirstName</label>
          <input
            type={"text"}
            id="FirstName"
            name="FirstName"
            placeholder="FirstName"
            className="mt-1 mb-2 w-full bg-slate-300 px-1 py-1 rounded focus-within:outline-blue-500"
            value={data.FirstName}
            onChange={handleOnChange}
          />
          <label htmlFor="LastName">LastName</label>
          <input
            type={"text"}
            id="LastName"
            name="LastName"
            placeholder="LastName"
            className="mt-1 mb-2 w-full bg-slate-300 px-1 py-1 rounded  focus-within:outline-blue-500"
            value={data.LastName}
            onChange={handleOnChange}
          />
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
          <label htmlFor="Password">Password</label>
          <div className="flex px-1 py-1 rounded bg-slate-300  focus-within:outline-blue-500 outline-none">
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="password"
              className=" w-full bg-slate-200 outline-none"
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
          <label htmlFor="Confirm Password">Confirm Password</label>
          <div className="flex px-1 py-1 rounded bg-slate-300  focus-within:outline-blue-500 outline-none">
            <input
              type={showconfirmpassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              placeholder="confirm password"
              className=" w-full bg-slate-200 outline-none"
              value={data.confirmpassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleconfirmpassword}
            >
              {showconfirmpassword ? <BiShow /> : <BiSolidHide />}
            </span>
          </div>
          <button type="submit" className="w-full max-w-[100px] m-auto mt-5 rounded-full text-center text-white bg-green-700 hover:bg-blue-600 cursor-pointer">
            Sign-Up
          </button>
        </form>

        <p className="text-sm">
          Already have an account..?
          <Link to={"/Login"} className="text-red-600 underline">
            Log-in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
