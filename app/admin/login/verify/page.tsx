import { decrypt, encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerifyTokenPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/admin/login?error=Invalid recovery link");
  }

  const payload = await decrypt(token);

  if (!payload || payload.type !== "recovery") {
    redirect("/admin/login?error=Expired or invalid recovery link");
  }

  // Check expiration (decrypt usually handles this if set in jose, but we can be explicit)
  if (new Date(payload.expires) < new Date()) {
    redirect("/admin/login?error=Recovery link has expired");
  }

  // Create a proper session (24h)
  const sessionExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ username: payload.username, expires: sessionExpires });

  // Instead of logging in directly, redirect to reset password page with the token
  // This ensures they have a chance to set a new password they know.
  redirect(`/admin/reset-password?token=${token}`);
}
