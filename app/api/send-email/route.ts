import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Change to your verified domain later
      to: [process.env.CONTACT_EMAIL || "your@email.com"],
      replyTo: email,
      subject: `New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e5e5; padding: 32px; border-radius: 12px; border: 1px solid #1a1a1a;">
          <h2 style="color: #39ff14; margin-top: 0; font-size: 24px;">📨 New Contact Message</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; width: 80px; font-size: 14px;">From</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; font-weight: bold; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #888; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; font-size: 14px;"><a href="mailto:${email}" style="color: #39ff14;">${email}</a></td>
            </tr>
          </table>
          
          <h3 style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Message</h3>
          <div style="background: #111; padding: 20px; border-radius: 8px; border-left: 3px solid #39ff14; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          
          <p style="margin-top: 24px; color: #555; font-size: 12px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
