'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { toast } from 'react-toastify';

const page = () => {

  const [blogs,setBlogs] = useState([])

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog"); //must provide endpoint API
    setBlogs(response.data.blogs); //stored in blogs state
  };

  const deleteBlog = async (mongoId) => {
 const response = await axios.delete('/api/blog/',{
 params:{
  id:mongoId
 }
 }) //must provide endpoint API
toast.success(response.data.msg); //display notification 'blog deleted'
fetchBlogs(); //refresh and update latest database
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className=" flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ">
      <h1>All blogs</h1>
      <div className="relative border border-gray-400 h-[80vh] max-w-[850px] scrollbar-hide overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author name
              </th>
              <th scope="col" className=" px-6 py-3">
                Blog title
              </th>
              <th scope="col" className=" px-6 py-3">
                Date
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item,index) => (
              <BlogTableItem  key={index} mongoId={item._id} deleteBlog={deleteBlog} title={item.title} author={item.author} date={item.date} authorImg={item.authorImg}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page
