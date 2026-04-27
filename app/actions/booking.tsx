"use server";

import { resend } from "@/lib/resend";
import { AdminBookingEmail, CustomerConfirmationEmail } from "@/components/email-template";

export type BookingFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
  leadSource: string;
  preferredDate?: string;
};

export async function submitBooking(data: BookingFormData) {
  try {
    const { name, phone, email, service, location, message, leadSource, preferredDate } = data;

    if (!name || !email || !phone) {
      return { success: false, error: "Name, email, and phone are required." };
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const adminEmail = "josephandcocleaningservicesltd@gmail.com";
    const fromEmail = "onboarding@resend.dev";
    const whatsappPrimary = "447787857305";

    const rawWaText = `*New Service Request - Joseph & Co*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Service:* ${service || "Not specified"}
*Location:* ${location || "Not specified"}
*Preferred Date:* ${preferredDate || "Not specified"}
*Lead Source:* ${leadSource}

*Message:*
${message || "N/A"}

*Submitted:* ${timestamp}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappPrimary}&text=${encodeURIComponent(rawWaText)}&lang=en`;

    if (!resend) {
      return { success: false, error: "Email service not configured." };
    }

    // ADMIN EMAIL
    const adminResponse = await resend.emails.send({
      from: `Joseph & Co Leads <${fromEmail}>`,
      to: adminEmail,
      subject: `New Lead: ${service || "General Inquiry"} - ${name}`,
      react: (
        <AdminBookingEmail
          name={name}
          email={email}
          phone={phone}
          service={service}
          location={location}
          message={message}
          leadSource={leadSource}
          timestamp={timestamp}
          preferredDate={preferredDate}
        />
      ),
    });

    if (adminResponse.error) {
      throw new Error(`Admin email failed: ${adminResponse.error.message}`);
    }

    // CUSTOMER CONFIRMATION TEST MODE -> SEND TO ADMIN ALSO
    const customerResponse = await resend.emails.send({
      from: `Joseph & Co <${fromEmail}>`,
      to: adminEmail,
      subject: `TEST Customer Confirmation Template for ${email}`,
      react: (
        <CustomerConfirmationEmail
          name={name}
          service={service}
          location={location}
        />
      ),
    });

    if (customerResponse.error) {
      throw new Error(`Customer email failed: ${customerResponse.error.message}`);
    }

    return { success: true, whatsappUrl: waUrl };
  } catch (error: any) {
    console.error("BOOKING PIPELINE ERROR:", error);
    return { success: false, error: error.message || "Unexpected error occurred." };
  }
}