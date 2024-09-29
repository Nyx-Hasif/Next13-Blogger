import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {      
  await ConnectDB();
};
LoadDB(); //run database


export async function POST(request){

    const formData = await request.formData();
    const emailData = {
        email:`${formData.get('email')}`, //when we sending this email in our formDAta we have to send it using 'email'
    }
    await EmailModel.create(emailData);//using this our email will be saved in our database

    return NextResponse.json({ success: true, msg: "Email Subscribed "}); //after stored, generate 1 response

}


export async function GET(request) {
  const emails = await EmailModel.find({}); //empty object added bcoz we want ALL emails
  return NextResponse.json({emails}); //return all emails
}

//endpoint for delete email
export async function DELETE(request){
  //get id from mongoDB
  const id = await request.nextUrl.searchParams.get('id');
  //find email
   await EmailModel.findByIdAndDelete(id);
   //generate response
   return NextResponse.json({ success: true, msg: "Email Deleted "});


}