import connectMongoDB from "@/app/libs/mongodb"
import ErrorFormData from "@/app/models/ErrorFormData";
import FormData from "@/app/models/FormData"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { key } = await req.json()
    await connectMongoDB()
    let data = []

    if (key === 'failed') {
        data = await ErrorFormData.find()
    }
    else {
        data = await FormData.find()
    }
    return NextResponse.json({ message: "GET request to /dashboard", data: data })
}