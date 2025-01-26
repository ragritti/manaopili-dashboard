import connectMongoDB from "@/app/libs/mongodb"
import FormData from "@/app/models/FormData"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    await connectMongoDB()
    const data = await FormData.find()
    return NextResponse.json({ message: "GET request to /dashboard", data: data})
}