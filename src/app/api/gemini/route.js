import { run } from "@/app/gemini"
import { NextResponse } from "next/server"

export async function POST(request){
    let data=await request.json()
    console.log(data)
    const res=await run(data)
    return NextResponse.json({success:true,data:res})
}