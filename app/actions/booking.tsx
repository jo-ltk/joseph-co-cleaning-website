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

    // Validate minimum required fields
    if (!name || !email || !phone) {
      return { success: false, error: "Name, email, and phone are required." };
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const adminEmail = process.env.ADMIN_EMAIL || "josephandcocleaningservicesltd@gmail.com";
    const fromEmail = process.env.CUSTOMER_FROM_EMAIL || "bookings@mail.josephcleaning.co.uk";
    const whatsappPrimary = process.env.WHATSAPP_PRIMARY || "447787857305";

    // WhatsApp Message Generation
    const waText = `*New Service Request - Joseph & Co*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service || "Not specified"}%0A*Location:* ${location || "Not specified"}%0A*Preferred Date:* ${preferredDate || "Not specified"}%0A*Lead Source:* ${leadSource}%0A%0A*Message:*%0A${message || "N/A"}%0A%0A*Submitted:* ${timestamp}`;
    const waUrl = `https://wa.me/${whatsappPrimary}?text=${waText}`;

    if (resend) {
      // Send Admin Notification using native React support
      const adminTask = resend.emails.send({
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

      // Send Customer Confirmation using native React support
      const customerTask = resend.emails.send({
        from: `Joseph & Co <${fromEmail}>`,
        to: email,
        subject: "We've received your service request - Joseph & Co",
        react: (
          <CustomerConfirmationEmail
            name={name}
            service={service}
            location={location}
          />
        ),
      });

      // Execute both
      await Promise.allSettled([adminTask, customerTask]).then((results) => {
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`${index === 0 ? "Admin" : "Customer"} email failed:`, result.reason);
          }
        });
      });

    } else {
      console.warn("RESEND_API_KEY is not set. Emails were not sent.");
    }

    return { success: true, whatsappUrl: waUrl };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
