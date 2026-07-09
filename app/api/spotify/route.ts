import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// Spotify "Recently Played" / "Now Playing" endpoint.
// Requires these env vars (see README "Spotify Integration"):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN
// If they're missing, this returns 204 and the UI shows the fallback track.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token as string;
}

// Revalidate at most once per 60s
export const revalidate = 60;

export async function GET() {
  try {
    const token = await getAccessToken();
    if (!token) {
      // Not configured — let the client use its fallback
      return new NextResponse(null, { status: 204 });
    }

    const auth = { Authorization: `Bearer ${token}` };

    // 1) Try currently playing
    const nowRes = await fetch(NOW_PLAYING_URL, {
      headers: auth,
      cache: "no-store",
    });

    if (nowRes.status === 200) {
      const now = await nowRes.json();
      if (now?.item) {
        return NextResponse.json({
          isPlaying: now.is_playing,
          title: now.item.name,
          artist: now.item.artists.map((a: { name: string }) => a.name).join(", "),
          url: now.item.external_urls.spotify,
          albumArt: now.item.album?.images?.[0]?.url ?? null,
        });
      }
    }

    // 2) Fall back to most recently played
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: auth,
      cache: "no-store",
    });

    if (recentRes.ok) {
      const recent = await recentRes.json();
      const track = recent?.items?.[0]?.track;
      if (track) {
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(", "),
          url: track.external_urls.spotify,
          albumArt: track.album?.images?.[0]?.url ?? null,
        });
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
