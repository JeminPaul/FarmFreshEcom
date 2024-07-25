import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Newproduct from './pages/Newproduct';
import Signup from './pages/Signup';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import Cart from './pages/Cart';

const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<Home/>}/>
    <Route path='menu/:filterby' element={<Menu/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='contact' element={<Contact/>}/>
    <Route path='Login' element={<Login/>}/>
    <Route path='Newproduct' element={<Newproduct/>}/>
    <Route path='Signup' element={<Signup/>}/>
    <Route path='Cart' element={<Cart/>}/>

  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
<RouterProvider router={router}/>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
