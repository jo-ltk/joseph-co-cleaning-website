import type { ReactElement } from "react";

import { careBrand } from "@/lib/care";
import { resend } from "@/lib/resend";

const TEST_FALLBACK = "josephandcocleaningservicesltd@gmail.com";

function fromAddress() {
  return process.env.CARE_FROM_EMAIL || process.env.CUSTOMER_FROM_EMAIL || "hello@josephco.uk";
}

function intendedRecipient() {
  return process.env.CARE_ADMIN_EMAIL || careBrand.email;
}

function isTestModeRestriction(message?: string) {
  return Boolean(
    message &&
      /only send testing emails to your own email address/i.test(message),
  );
}

export async function sendCareEmail({
  subject,
  replyTo,
  react,
  attachments,
  to: toOverride,
}: {
  subject: string;
  replyTo: string;
  react: ReactElement;
  attachments?: Array<{ filename: string; content: Buffer }>;
  to?: string;
}) {
  const to = toOverride || intendedRecipient();
  const from = `Care Connect <${fromAddress()}>`;
  const payload = {
    from,
    to,
    replyTo,
    subject,
    react,
    attachments: attachments?.map((file) => ({
      filename: file.filename,
      content: file.content,
    })),
  };

  const first = await resend.emails.send(payload);
  if (!first.error) {
    return { success: true as const };
  }

  if (isTestModeRestriction(first.error.message) && to !== TEST_FALLBACK) {
    const retry = await resend.emails.send({
      ...payload,
      to: TEST_FALLBACK,
      subject: `[Care Connect] ${subject}`,
    });
    if (!retry.error) {
      return { success: true as const };
    }
    return { success: false as const, error: retry.error.message };
  }

  return { success: false as const, error: first.error.message };
}
