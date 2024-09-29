'use client'
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React,{ useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

  //setImage to input file

  const [image,setImage] = useState(false)
  const [data,setData] = useState({
    title:'',
    description:'',
    category:'Startup',
    author:'Hasif',
    authorImg:'/author_img.png'
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value})) // must have () because need to return in 1 statement [rule]
    console.log(data)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // it prevents page refresh
    //cr8 formData to save data
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('author',data.author);
    formData.append('authorImg',data.authorImg);
    formData.append('image',image); // from usestate image
    const response = await axios.post('/api/blog',formData);
    //check data working or not when submitted
    if(response.data.success){ //sucess from route.js
      toast.success(response.data.msg) // refer to route.js
      setImage(false);
      setData({
        title:"",
        description:"",
        category:"Startup",
        author:"Hasif",
        authorImg:"/author_img.png"
      });
    }else{
      toast.error(response.data.error) // refer to route.js
    }

  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className=" h-[100vh] pt-5 sm:pt-12 sm:pl-16 ">
        <p className='text-xl font-medium'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image src={!image?assets.upload_area:URL.createObjectURL(image)} alt="" width={140} height={70} className='mt-4 cursor-pointer'/>
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl font-medium mt-4' >Blog Title</p>
        <input name='title' value={data.title} onChange={onChangeHandler} type="text" className='w-full sm:w-[500px] mt-4 px-4 py-3 border' placeholder='Enter blog title' required />
        <p className='text-xl font-medium mt-4' >Blog Description</p>
        <textarea name='description' value={data.description} onChange={onChangeHandler} type="text" className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={6} placeholder='Enter content here'required />
        <p className='text-xl font-medium mt-4' >Blog Category</p>
        <select name="category" value={data.category} onChange={onChangeHandler} className='w-40 mt-4 px-4 py-3 text-gray-500'>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type='submit' className='bg-black w-40 mt-8 h-12 text-white '>ADD</button>
      </form>
    </>
  );
}

export default page
