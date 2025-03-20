import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req) => {
    try {
        const { Name, Email, message, resume } = await req.json();

        // Create Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "manaopili.info@gmail.com", // Your email
                pass: "ewhw aown bfpz ggbj", // Your email password or app password
            },
        });

        // Decode Base64 PDF if present
        let attachments = [];
        if (resume) {
            attachments.push({
                filename: "resume.pdf", // Name of the file
                content: Buffer.from(resume, "base64"), // Convert Base64 to Buffer
                contentType: "application/pdf",
            });
        }

        // Email content
        let mailOptions = {
            from: "manaopili.info@gmail.com",
            to: ["manaopili.info@gmail.com", "shreyaskashyap2002@gmail.com"], // Multiple recipients
            subject: "New Applicant Submission",
            html: `
                <h2>New Application Received</h2>
                <p><strong>Name:</strong> ${Name}</p>
                <p><strong>Email:</strong> ${Email}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br/>
                <p>Best Regards,</p>
                <p>Manaopili Team</p>
            `,
            attachments: attachments, // Attach PDF if available
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: `Email sent successfully to manaopili.info@gmail.com` });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
    }
};