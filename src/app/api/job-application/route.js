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
            to: ["info@manaopili.com","rittirag@manaopili.com", "shreyaskashyap2002@gmail.com"], // Multiple recipients
            subject: "📩 New Applicant Submission - Manaopili",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="background-color: #0073e6; color: #ffffff; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">New Job Application Received</h2>
                    </div>

                    <div style="padding: 20px; color: #333;">
                        <p style="font-size: 18px; font-weight: bold;">Hello Manaopili Team,</p>
                        <p>A new job application has been submitted. Below are the details:</p>

                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${Name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${Email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message:</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
                            </tr>
                        </table>

                        <p style="margin-top: 20px;">Please review the attached resume (if provided).</p>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="mailto:${Email}" style="background-color: #0073e6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">Reply to Applicant</a>
                        </div>
                    </div>

                    <div style="background-color: #0073e6; color: white; text-align: center; padding: 10px; font-size: 14px; border-radius: 0 0 10px 10px;">
                        <p style="margin: 0;">Manaopili Team | Contact: <a href="mailto:manaopili.info@gmail.com" style="color: white; text-decoration: none;">manaopili.info@gmail.com</a></p>
                    </div>
                </div>
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