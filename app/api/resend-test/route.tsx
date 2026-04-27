import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/email-template";

export async function GET() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "josephandcocleaningservicesltd@gmail.com";
    const fromEmail = process.env.CUSTOMER_FROM_EMAIL || "bookings@mail.josephcleaning.co.uk";

    // Try sending with the verified domain first, fallback to onboarding if needed
    const { data, error } = await resend.emails.send({
      from: `Joseph & Co Test <${fromEmail}>`,
      to: adminEmail,
      subject: "Joseph & Co - Resend Integration Test",
      react: <EmailTemplate firstName="Admin" />,
    });

    if (error) {
      console.error("Resend test error:", error);
      
      // Fallback to onboarding@resend.dev for testing if verified domain fails
      const fallback = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: adminEmail,
        subject: "Joseph & Co - Resend Onboarding Test",
        react: <EmailTemplate firstName="Admin" />,
      });

      if (fallback.error) {
        return NextResponse.json({ success: false, error: fallback.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: fallback.data, note: "Sent via onboarding@resend.dev fallback" });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Fatal test route error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
