"use server";

import { z } from "zod";

import { CareStaffRequestEmail } from "@/components/care/emails";
import { sendCareEmail } from "@/lib/care-mail";

const StaffRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  organisation: z.string().min(2, "Organisation is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
  facilityType: z.string().min(2, "Select a facility type"),
  staffingNeed: z.string().min(2, "Select a staffing requirement"),
  message: z.string().optional(),
});

export async function submitStaffRequest(raw: z.infer<typeof StaffRequestSchema>) {
  const parsed = StaffRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid details" };
  }

  const data = parsed.data;
  const timestamp = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    return await sendCareEmail({
      replyTo: data.email,
      subject: `Staffing request: ${data.organisation} — ${data.staffingNeed}`,
      react: (
        <CareStaffRequestEmail
          name={data.name}
          organisation={data.organisation}
          email={data.email}
          phone={data.phone}
          facilityType={data.facilityType}
          staffingNeed={data.staffingNeed}
          message={data.message || ""}
          timestamp={timestamp}
        />
      ),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send your request.";
    return { success: false, error: message };
  }
}
