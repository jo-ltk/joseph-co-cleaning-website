"use server";

import { redirect } from "next/navigation";
import { login, logout, encrypt, decrypt } from "@/lib/auth";
import { resend } from "@/lib/resend";
import { headers, cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

import { RecoveryEmail } from "@/components/email-template";

export async function loginAction(prevState: any, formData: FormData) {
  const success = await login(formData);
  
  if (success) {
    redirect("/admin/portfolio");
  } else {
    return { error: "Invalid username or password" };
  }
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const username = formData.get("username");
  
  if (username !== process.env.ADMIN_USER) {
    // We return success anyway to prevent user enumeration, 
    // but in a single-admin system, it's fine to just be honest or generic.
    return { error: "Username not recognized." };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.CUSTOMER_FROM_EMAIL || "onboarding@resend.dev";
    
    if (!adminEmail) {
      return { error: "Admin email not configured in environment." };
    }

    // Create a 15-minute recovery token
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    const token = await encrypt({ username, expires, type: "recovery" }, "15m");

    const headerList = await headers();
    const host = headerList.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const recoveryUrl = `${protocol}://${host}/admin/login/verify?token=${token}`;

    const { error } = await resend.emails.send({
      from: `Joseph & Co Security <${fromEmail}>`,
      to: adminEmail,
      subject: "Administrative Access Recovery",
      react: <RecoveryEmail recoveryUrl={recoveryUrl} />
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "Failed to send recovery email. Please try again later." };
    }

    return { success: true, message: "Recovery link sent to your admin email." };
  } catch (err: any) {
    console.error("Forgot Password Error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function resetPasswordAction(prevState: any, formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) return { error: "Missing recovery token." };
  if (!password || password.length < 6) return { error: "Password must be at least 6 characters." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };

  try {
    const payload = await decrypt(token);
    if (!payload || payload.type !== "recovery") {
      return { error: "Invalid or expired recovery token." };
    }

    // UPDATE .ENV FILE
    // This works on local/VPS but might not on platforms like Vercel (read-only FS)
    const envPath = path.join(process.cwd(), ".env");
    let envContent = await fs.readFile(envPath, "utf-8");

    // Regex to find and replace ADMIN_PASS
    const adminPassRegex = /^ADMIN_PASS=.*$/m;
    if (adminPassRegex.test(envContent)) {
      envContent = envContent.replace(adminPassRegex, `ADMIN_PASS=${password}`);
    } else {
      // If for some reason it's not there, append it
      envContent += `\nADMIN_PASS=${password}`;
    }

    await fs.writeFile(envPath, envContent, "utf-8");

    // Also update process.env for the current session (though it might restart anyway)
    process.env.ADMIN_PASS = password;

    // Create a 24h session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ username: payload.username, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

  } catch (err: any) {
    console.error("Reset Password Error:", err);
    return { error: "Failed to update password. Please check system permissions." };
  }

  // Redirect to portfolio after success
  redirect("/admin/portfolio");
}
