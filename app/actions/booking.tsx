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
};

export async function submitBooking(data: BookingFormData) {
  try {
    const { name, phone, email, service, location, message, leadSource } = data;

    // Validate minimum required fields
    if (!name || !email || !phone) {
      return { success: false, error: "Name, email, and phone are required." };
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // WhatsApp Message Generation
    const waText = `*New Service Request - Joseph & Co*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service || "Not specified"}%0A*Location:* ${location || "Not specified"}%0A*Lead Source:* ${leadSource}%0A%0A*Message:*%0A${message || "N/A"}`;
    // Using Julia's number as primary
    const waUrl = `https://wa.me/447787857305?text=${waText}`;

    if (resend) {
      // Send Admin Notification
      await resend.emails.send({
        from: "Joseph & Co Booking <bookings@josephandco.com>",
        to: process.env.COMPANY_EMAIL || "JosephandCol.t.d@outlook.com",
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
          />
        ),
      }).catch(e => console.error("Admin email error:", e));

      // Send Customer Confirmation
      await resend.emails.send({
        from: "Joseph & Co <bookings@josephandco.com>",
        to: email,
        subject: "We've received your service request - Joseph & Co",
        react: (
          <CustomerConfirmationEmail
            name={name}
            service={service}
            location={location}
          />
        ),
      }).catch(e => console.error("Customer email error:", e));
    } else {
      console.warn("RESEND_API_KEY is not set. Emails were not sent.");
    }

    return { success: true, whatsappUrl: waUrl };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
