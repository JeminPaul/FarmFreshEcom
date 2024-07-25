import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react"
import { setDataproduct } from "./redux/productslide";
import { useDispatch, useSelector } from "react-redux";
       
function App() {
  const dispatch=useDispatch()
  const productData=useSelector((state)=>state.product)
  console.log(productData);
  useEffect(()=>{
    (async()=>{
      const res= await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData=await res.json()
      console.log(resData);
      dispatch(setDataproduct(resData))
    })()

  },[])
  return (
    <>
    <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
