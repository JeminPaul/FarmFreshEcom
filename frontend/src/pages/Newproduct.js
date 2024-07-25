import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imagetobase64 } from "../utility/imagetobase64";
import {toast} from "react-hot-toast"

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  // const handleOnChange=(e)=>{
  //   const [name,value]=e.target
  //   setData((preve)=>{
  //     return{
  //       ...preve,
  //       [name]:value
  //     }

  //   })

  // }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const uploadimage=async(e)=>{
  //   const data=await imagetobase64(e.target.files[0])
  //   console.log(data);
  // }

  // const uploadimage = async (e) => {
  //   const selectedFile = e.target.files[0];

  //   if (selectedFile) {
  //     const data = await imagetobase64(selectedFile);
  //     console.log(data);
  //   } else {
  //     console.error("No file selected.");
  //   }
  // };
  const uploadimage = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const base64Data = await imagetobase64(selectedFile);
      setData({
        ...data,
        image: base64Data,
      });
    } else {
      console.error("No file selected.");
    }
  };

  // const handlesubmit=(e)=>{
  //   e.preventDefault()
  //   console.log(data);
  // }
  const handlesubmit = async(e) => {
     e.preventDefault();
    console.log(data);

   const {name,image,category,price}=data
   if(name&&image&&category&&price){
    const fetchdata=await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadproduct`,{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const fetchRes=await fetchdata.json()
    console.log(fetchRes);
    toast(fetchRes.message)
    setData(()=>{
      return{
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
      }
    })
   }else{
    toast("require fields")
   }
  
  };

  return (
    <div className="p-4">
      <form className="m-auto w-full max-w-md p-3 shadow flex flex-col bg-white">
        <label htmlFor="name" className="font-bold">
          Name
        </label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 my-1"
          onChange={handleOnChange} value={data.name}
        />
        {/* <label htmlFor='category' className='text-size-bold'>Category</label> */}
        <label htmlFor="category" className="font-bold">
          Category
        </label>

        <select
          className="bg-slate-200 my-1 font-medium "
          id="category"
          name="category"
          onChange={handleOnChange} value={data.category}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegitables"}>Vegitables</option>
          <option value={"ice"}>Ice-Cream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>pizza</option>
          <option value={"Hot-Chips"}>Hot-Chips</option>
          <option value={"Cake"}>Cake</option>
          <option value={"Rice"}>Rice</option>
          <option value={"Sandwich"}>Sandwich</option>
        </select>
        <label htmlFor="image" className="font-bold">
          Image
          <div className="h-40 w-full bg-green-300  rounded flex items-center justify-center">
            {data.image?<img src={data.image}className="h-full flex items-center" />: <span className="text-6xl cursor-pointer">
              <FaCloudUploadAlt />
            </span>}
           
            
            <input
              type={"file"}
              id="image"
              onChange={uploadimage}
              className="hidden"
            />
          </div>
        </label>
        <label htmlFor="price" className="font-bold">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 my-1"
          name="price"
          onChange={handleOnChange} value={data.price}
        />
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <textarea
          rows={2}
          className="bg-slate-200 my-1 resize-none"
          name="description"
          onChange={handleOnChange} value={data.description}
        ></textarea>
        <button className="bg-red-500 hover:bg-green-500 text-white my-2 font-extrabold rounded-full cursor-pointer text-center drop-shadow" type="button" onClick={handlesubmit}>
          Add-Product
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
