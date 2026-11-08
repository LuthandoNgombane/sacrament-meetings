import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

// Calculate the current Sunday on each request.
import { connection } from "next/server";

export default async function CurrentMeetingPage() {

  await connection();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")!.value;
  const month = parts.find((part) => part.type === "month")!.value;
  const day = parts.find((part) => part.type === "day")!.value;

  // Represent the South African calendar date at UTC midnight.
  const sunday = new Date(`${year}-${month}-${day}T00:00:00Z`);

  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());

  const sundayDate = sunday.toISOString().slice(0, 10);
  const meeting = getMeetings(sundayDate)[0];

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}