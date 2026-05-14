"use server";

import { resend } from "@/lib/resend";
import { AdminBookingEmail, CustomerConfirmationEmail } from "@/components/email-template";
import { z } from "zod";

// 1. Strict Server-Side Validation with Zod
const BookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
  leadSource: z.string().default("Contact Page"),
  preferredDate: z.string().optional(),
});

export type BookingFormData = z.infer<typeof BookingSchema>;

export async function submitBooking(rawData: BookingFormData) {
  try {
    // 2. Validate incoming data
    const validation = BookingSchema.safeParse(rawData);
    
    if (!validation.success) {
      return { 
        success: false, 
        error: validation.error.issues[0].message 
      };
    }

    const data = validation.data;
    const { name, phone, email, service = "", location = "", message = "", leadSource, preferredDate = "" } = data;

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 3. PRODUCTION CONFIGURATION
    const adminEmail = "josephandcocleaningservicesltd@gmail.com";
    const fromEmail = "hello@josephco.uk";
    const whatsappPrimary = "447787857305";

    const rawWaText = `*New Service Request - Joseph & Co*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Service:* ${service || "Not specified"}\n*Location:* ${location || "Not specified"}\n*Preferred Date:* ${preferredDate || "Not specified"}\n*Lead Source:* ${leadSource}\n\n*Message:*\n${message || "N/A"}\n\n*Submitted:* ${timestamp}`;
    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappPrimary}&text=${encodeURIComponent(rawWaText)}&lang=en`;

    if (!resend) {
      return { success: false, error: "Email service not configured." };
    }

    // 4. FIRE EMAILS CONCURRENTLY
    const [adminResponse, customerResponse] = await Promise.all([
      // ADMIN EMAIL
      resend.emails.send({
        from: `Joseph & Co Leads <${fromEmail}>`,
        to: adminEmail,
        replyTo: email, // CRITICAL: Allows replying directly to the customer
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
      }),
      
      // CUSTOMER CONFIRMATION EMAIL
      resend.emails.send({
        from: `Joseph & Co <${fromEmail}>`,
        to: email, // Sent to the actual customer
        replyTo: adminEmail,
        subject: `We've received your inquiry - Joseph & Co`,
        react: (
          <CustomerConfirmationEmail
            name={name}
            service={service}
            location={location}
          />
        ),
      })
    ]);

    if (adminResponse.error) {
      console.error("Resend Admin Error:", adminResponse.error);
      throw new Error(`Admin email failed: ${adminResponse.error.message}`);
    }

    if (customerResponse.error) {
      console.error("Resend Customer Error:", customerResponse.error);
      // We don't throw here to avoid blocking the user if only the confirmation fails
    }

    return { success: true, whatsappUrl: waUrl };
  } catch (error: any) {
    console.error("BOOKING PIPELINE ERROR:", error);
    return { success: false, error: error.message || "Unexpected error occurred." };
  }
}