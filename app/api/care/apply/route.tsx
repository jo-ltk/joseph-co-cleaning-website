import { NextResponse } from "next/server";
import { z } from "zod";

import { CareApplicationEmail } from "@/components/care/emails";
import { CARE_APPLICATION_RECIPIENT, sendCareEmail } from "@/lib/care-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4.5 * 1024 * 1024;
const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function cvContentType(filename: string) {
  if (/\.pdf$/i.test(filename)) return "application/pdf";
  if (/\.docx$/i.test(filename)) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (/\.doc$/i.test(filename)) return "application/msword";
  return "application/octet-stream";
}

const ApplicationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
  location: z.string().min(2, "Enter your location"),
  position: z.enum([
    "Registered Nurse",
    "Healthcare Assistant",
    "Support Worker",
    "Domestic Assistant",
    "Kitchen Assistant",
    "Other",
  ]),
  experience: z.string().min(1, "Enter your years of experience"),
  summary: z.string().optional(),
  consent: z.literal("true"),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const cv = formData.get("cv");

    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json(
        { success: false, error: "Please attach your CV as a PDF, DOC or DOCX file." },
        { status: 400 },
      );
    }

    if (cv.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "CV must be 4.5MB or smaller." },
        { status: 400 },
      );
    }

    const typeOk =
      allowedTypes.includes(cv.type) ||
      /\.(pdf|doc|docx)$/i.test(cv.name);

    if (!typeOk) {
      return NextResponse.json(
        { success: false, error: "CV must be a PDF, DOC or DOCX file." },
        { status: 400 },
      );
    }

    const parsed = ApplicationSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      position: formData.get("position"),
      experience: formData.get("experience"),
      summary: formData.get("summary") || "",
      consent: formData.get("consent"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Please check the form details." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });
    const buffer = Buffer.from(await cv.arrayBuffer());

    const result = await sendCareEmail({
      to: CARE_APPLICATION_RECIPIENT,
      replyTo: data.email,
      subject: `New Care Connect Job Application — ${data.fullName}`,
      react: (
        <CareApplicationEmail
          fullName={data.fullName}
          email={data.email}
          phone={data.phone}
          location={data.location}
          position={data.position}
          experience={data.experience}
          summary={data.summary || ""}
          timestamp={timestamp}
        />
      ),
      attachments: [
        {
          filename: cv.name,
          content: buffer,
          contentType: cvContentType(cv.name),
        },
      ],
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit your application.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
