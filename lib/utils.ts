import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isVideo(url: string | undefined | null) {
  if (!url) return false;
  const ext = url.split(".").pop()?.split("?")[0].toLowerCase();
  return ["mp4", "webm", "mov", "m4v"].includes(ext || "");
}

export function isAudio(url: string | undefined | null) {
  if (!url) return false;
  const ext = url.split(".").pop()?.split("?")[0].toLowerCase();
  return ["mp3", "wav", "ogg", "m4a", "aac"].includes(ext || "");
}
