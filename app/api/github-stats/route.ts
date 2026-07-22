import { NextResponse } from "next/server";
import { getGitHubData } from "@/utils/getGitData";

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getGitHubData();

    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub activity is temporarily unavailable" },
      { status: 502 },
    );
  }
}
