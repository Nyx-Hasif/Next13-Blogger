/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import SubscriptionTableItem from '@/Components/AdminComponents/SubscriptionTableItem'
import axios from 'axios'
import React, {  useState,useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

// eslint-disable-next-line react-hooks/rules-of-hooks
const [data,setData] = useState([]);

const fetchEmails = async () => {
  const response = await axios.get("/api/email"); //get email data from the URL
  setData(response.data.emails)
}

//delete email function

const deleteEmail = async (mongoId) => {
  //call the delete API route
  const response = await axios.delete('/api/email',{
    params:{
      id:mongoId
    } //pass mongoId as a parameter
  });
//check and display notification
  if(response.data.success){
    toast.success(response.data.msg)
    fetchEmails(); //refresh the latest database after delete particular email
  }else{
    toast.error('Error try again')
  }

}

useEffect(()=>{ //call the async function in webpage
fetchEmails();
},[]); //add an array is a must to execute first time

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscription
              </th>
              <th scope='col' className=' hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {data.map((item,index)=>
           (
              <SubscriptionTableItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date}/>
            )
          )}
  
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
