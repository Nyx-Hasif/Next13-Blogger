//THIS IS SERVER SIDE RENDERING

import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

const fs = require('fs')

// Connect to DB function
const LoadDB = async () => {
  try {
    await ConnectDB();
  } catch (error) {
    console.error("Error connecting to database:", error);
    // Optionally, throw an error to propagate up to the request handler
    // throw error;
  }
};

LoadDB(); // Run server-side rendering

//API endpoint for getting all blogs
export async function GET(request) {
  
  //getting blog ID

  const blogId = request.nextUrl.searchParams.get('id') //get id for particurlar blog
  //add if statement to decide whether blog get or not the id

  if(blogId){
    const blog = await BlogModel.findById(blogId); //get particular blog id data n stored it into blog
    return NextResponse.json(blog); //return the particular data
  }else{ //if not sending blog id,then return all blog data in response
    const blogs = await BlogModel.find({}); //empty object added //get all data blog
    return NextResponse.json({ blogs });
  }
  }
  


//API endpoint for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();
  const image = formData.get("image");

  try {
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;

    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: `${imgUrl}`,
      authorImg: `${formData.get("authorImg")}`
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ success: false, error: "Error adding blog" }); // Informative error message
  }
}


//API Endpoint for delete Blog
export async function DELETE(request){
 const id = await request.nextUrl.searchParams.get('id'); // get id for particular blog
 const blog = await BlogModel.findById(id); // get particular blog id data n stored it into blog
fs.unlink(`./public/${blog.image}`,()=>{}); //delete image from public folder
await BlogModel.findByIdAndDelete(id); //delete blog data particular from database
return NextResponse.json({ success: true, msg: "Blog Deleted" });


}