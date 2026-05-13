import { useState, useEffect } from 'react';

export interface YTVideoSnippet {
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
}

export function useYouTubeVideoData(videoId: string): {
  data: YTVideoSnippet | null;
  loading: boolean;
} {
  const [data, setData] = useState<YTVideoSnippet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const key = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!key) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${key}`,
    )
      .then((r) => r.json())
      .then((json: { items?: { snippet: {
        title: string;
        description: string;
        channelTitle: string;
        thumbnails: Record<string, { url: string }>;
      } }[] }) => {
        if (cancelled) return;
        const item = json.items?.[0];
        if (!item) return;
        const s = item.snippet;
        setData({
          title: s.title,
          description: s.description,
          channelTitle: s.channelTitle,
          thumbnailUrl:
            s.thumbnails?.maxres?.url ??
            s.thumbnails?.high?.url ??
            s.thumbnails?.medium?.url ??
            '',
        });
      })
      .catch(() => { /* fall back to player.getVideoData() */ })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [videoId]);

  return { data, loading };
}