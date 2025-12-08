"use server";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  const parsedData = JSON.parse(session);
  return parsedData;
}

export async function setSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(token), {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    path: "/",
    sameSite: "strict",
  });
}

export async function setUserSession(token: string, userEmail: string) {
  const cookieStore = await cookies();
  const cookieOptions = {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    path: "/",
    sameSite: "strict" as const,
  };

  cookieStore.set("session", JSON.stringify(token), cookieOptions);
  cookieStore.set("userEmail", userEmail, cookieOptions);
}

export async function setUserEmail(email: string) {
  const cookieStore = await cookies();
  cookieStore.set("email", email, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
    path: "/",
    sameSite: "strict",
  });
}

export async function getUserEmail() {
  const cookieStore = await cookies();
  return cookieStore.get("email")?.value ?? null;
}
