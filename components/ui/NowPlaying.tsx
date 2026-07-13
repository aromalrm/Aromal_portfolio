"use client";

import { useEffect, useState } from "react";
import { SPOTIFY_FALLBACK } from "@/lib/data";

interface Track {
  title: string;
  artist: string;
  url: string;
  isPlaying?: boolean;
}

/**
 * Shows the most recently played (or currently playing) Spotify track.
 * Falls back to SPOTIFY_FALLBACK from lib/data.ts if the API isn't configured.
 * See README "Spotify Integration" to enable live data via /api/spotify.
 */
export function NowPlaying() {
  const [track, setTrack] = useState<Track>(SPOTIFY_FALLBACK);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/spotify")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && data.title) {
          setTrack({
            title: data.title,
            artist: data.artist,
            url: data.url || SPOTIFY_FALLBACK.url,
            isPlaying: data.isPlaying,
          });
        }
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      title="Play on Spotify"
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-accent transition-colors group"
    >
      {/* Spotify glyph */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="#1DB954"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.66-1.56.3z" />
      </svg>

      {/* Animated equalizer */}
      <span className="inline-flex items-end gap-[1.5px] h-3" aria-hidden="true">
        <EqBar delay="0s" />
        <EqBar delay="0.2s" />
        <EqBar delay="0.4s" />
      </span>

      <span className="text-[10px] text-muted-foreground">
        {track.isPlaying ? "Now playing —" : "Last played —"}
      </span>
      <span className="text-[10.5px] font-medium text-foreground group-hover:underline underline-offset-2">
        {track.title}
      </span>
      <span className="text-[10px] text-muted-foreground">· {track.artist}</span>
    </a>
  );
}

function EqBar({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block w-[2px] rounded-[1px] bg-[#1DB954]"
      style={{
        height: "5px",
        animation: "eq 0.9s ease-in-out infinite",
        animationDelay: delay,
      }}
    />
  );
}
