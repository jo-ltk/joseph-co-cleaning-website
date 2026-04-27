import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { AdminBookingEmail } from "@/components/email-template";

export async function GET() {
  console.log("========================================");
  console.log("🚨 STARTING API DEBUG BOOKING MAIL");
  console.log("========================================");

  const adminEmail = process.env.ADMIN_EMAIL || "josephandcocleaningservicesltd@gmail.com";
  const fromEmail = process.env.CUSTOMER_FROM_EMAIL || "bookings@mail.josephcleaning.co.uk";

  console.log("Using ADMIN_EMAIL:", adminEmail);
  console.log("Using CUSTOMER_FROM_EMAIL:", fromEmail);
  console.log("RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);

  try {
    if (!resend) {
      throw new Error("Resend client is undefined");
    }

    const response = await resend.emails.send({
      from: `Joseph & Co Leads <${fromEmail}>`,
      to: adminEmail,
      subject: `Debug Test: Admin Email`,
      react: (
        <AdminBookingEmail
          name="Test User"
          email="test@example.com"
          phone="1234567890"
          service="Debug Service"
          location="Debug Location"
          message="This is a strict test to verify Resend delivery."
          leadSource="API Route"
          timestamp={new Date().toISOString()}
        />
      ),
    });

    console.log("API DEBUG RAW RESPONSE:", JSON.stringify(response, null, 2));

    if (response.error) {
      console.error("❌ API DEBUG EMAIL FAILED:", response.error);
      return NextResponse.json({ success: false, error: response.error }, { status: 400 });
    }

    console.log("✅ API DEBUG EMAIL SENT SUCCESSFULLY");
    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("❌ API DEBUG FATAL ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
