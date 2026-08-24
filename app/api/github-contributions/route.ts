import { NextResponse } from "next/server";

const GITHUB_USERNAME = "aromalrm";
const GITHUB_CONTRIBUTIONS_URL = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(GITHUB_CONTRIBUTIONS_URL, {
      headers: { "User-Agent": "aromal-portfolio" },
      next: { revalidate },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to load GitHub contributions" },
        { status: response.status },
      );
    }

    const html = await response.text();
    const days = Array.from(
      html.matchAll(
        /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>[\s\S]*?<\/td>\s*<tool-tip[^>]*>([^<]*)<\/tool-tip>/g,
      ),
    ).map(([, date, level, tooltip]) => {
      const countMatch = tooltip.match(/([\d,]+) contribution/);
      return {
        date,
        count: countMatch ? Number(countMatch[1].replace(/,/g, "")) : 0,
        level: Number(level),
      };
    });

    if (!days.length) {
      return NextResponse.json(
        { error: "GitHub contribution data was not found" },
        { status: 502 },
      );
    }

    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
    return NextResponse.json({
      username: GITHUB_USERNAME,
      total: totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : days.reduce((sum, day) => sum + day.count, 0),
      days,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load GitHub contributions" },
      { status: 502 },
    );
  }
}
