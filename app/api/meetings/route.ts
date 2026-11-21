import type { NextRequest } from "next/server";
import { getMeetings, getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: NextRequest): Promise<Response> {
  const date = request.nextUrl.searchParams.get("date");

  if (date !== null) {
    const parsed = new Date(`${date}T00:00:00.000Z`);

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== date
    ) {
      return Response.json(
        { error: "Provide a valid date in YYYY-MM-DD format." },
        { status: 400 }
      );
    }
  }

  try {
    const meetings =
      date !== null
        ? await getMeetingsByDate(date)
        : await getMeetings();

    return Response.json(meetings);
  } catch (error) {
    console.error("Failed to fetch meetings:", error);

    return Response.json(
      { error: "Unable to fetch meetings." },
      { status: 500 }
    );
  }
}