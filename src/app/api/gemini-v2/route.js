
import { run } from "@/app/gemini_v2"
import { NextResponse } from "next/server"

export async function POST(request){
    let data=await request.json()
    const res=await run(data)
    return NextResponse.json({success:true,data:res})
}