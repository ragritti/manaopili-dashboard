import connectMongoDB from "@/app/libs/mongodb"
import ContactLead from "@/app/models/ContactLead"
import { NextResponse } from "next/server"

export async function POST(request) {
    await connectMongoDB()
    let data = await request.json()
    const { email, name, company, message } = data
    const newLead = new ContactLead({ name,email,company,message })
    const res = await newLead.save()
    return NextResponse.json({ message: "saved"})
}