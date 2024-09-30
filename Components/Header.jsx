import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {

//email data api
const [email,setEmail] = useState(''); //initialize empty string

const onSubmitHandler = async (e) => {
  e.preventDefault(); // it prevents page refresh
  //cr8 formData to save data
  const formData = new FormData();
  formData.append("email",email);
  const response = await axios.post('/api/email',formData);
    console.log(response);
  //check data working or not when submitted
  if(response.data.success){ //sucess from route.js
    toast.success(response.data.msg) // refer to route.js
    setEmail(''); //clear input field
  
  }else{
    toast.error('Error try Again') // refer to route.js
  }
}

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 ">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />  
         <Link href={'/admin'}>
        <button className="flex items-center gap-2 font-medium py-1 px-2 sm:py-3 sm:px-3 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
        Admin Panel <Image src={assets.arrow} alt="" />
        </button>
        </Link>
      </div>
      <div className="text-center my-8 ">
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Feel free to add your email and blog post to our newsletter! Dont forget to use the admin panel to add new blogs</p>
        <form onSubmit={onSubmitHandler} className=' border border-black flex  max-w-[300px] scale-75 sm:scale-100 mx-auto mt-10 shadow-[-7px_7px_0px_#000000]' action="">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  placeholder='Enter your email' className=' pl-4 border-r border-black '/>
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
