import connectMongoDB from "@/app/libs/mongodb";
import SurveyData from "@/app/models/SurveyData";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connectMongoDB()
    const { key } = await req.json()
    let data = []

    data = await SurveyData.find({ status: key })
    return NextResponse.json({ message: "GET request to /dashboard", data: data })
}

// Never push this to production !!!!!!!!

// export const DELETE = async (req) => {
//     await connectMongoDB()
//     await SurveyData.deleteMany({})
//     return NextResponse.json({ message: "All entries deleted successfully" })
// }
