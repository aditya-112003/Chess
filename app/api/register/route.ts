import { connnectToMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST( req : any ) {
    try {
        const { name , email , password } = await req.json();
        const hashedPassword = await bcrypt.hash(password , 12);

        await connnectToMongoDB(); 
        await User.create({name , email , password : hashedPassword});

        return NextResponse.json({message : "User Registered" } , {status : 201} )
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Error in Registration" } , {status : 500})
    }
}