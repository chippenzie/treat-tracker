import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentTimecode(): number {
  // right now changes every minute
  return Math.floor(Number(new Date()) / (1000 * 60));
}

export function timeCodeToTime(timeCode: number): Date {
  const epochTime = timeCode * 60 * 1000;
  return new Date(epochTime);
}

export async function getUserId() {
  const session = await auth();
  return session?.user?.id
}
