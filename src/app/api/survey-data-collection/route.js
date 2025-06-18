import connectMongoDB from "@/app/libs/mongodb"
import SurveyData from "@/app/models/SurveyData";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectMongoDB();
    const {  Name, Email, data,status,error } = await req.json();
    const newSurvey = new SurveyData({
        email: Email,
        OrganizationName: Name,
        data,
        status,
        error
    })
    const res=await newSurvey.save()
    return NextResponse.json({message:"Survey data saved"})
}