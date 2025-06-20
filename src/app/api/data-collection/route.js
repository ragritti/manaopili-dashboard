import connectMongoDB from "@/app/libs/mongodb"
import LeadsData from "@/app/models/LeadsData"
import { NextResponse } from "next/server"

export async function POST(request) {
    await connectMongoDB()
    let data = await request.json()
    const { email, OrganizationName } = data
    const newLead = new LeadsData({ email, OrganizationName })
    const res = await newLead.save()
    return NextResponse.json({ message: "saved"})
}