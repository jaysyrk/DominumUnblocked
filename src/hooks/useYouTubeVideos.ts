import { useEffect, useState } from 'react';
import { YouTubeVideo } from '../components/YouTubeCard';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const DEFAULT_QUERY = 'gaming videos';

export function useYouTubeVideos(searchQuery: string) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
      setVideos([]);
      setError('Missing YouTube API key.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          part: 'snippet',
          type: 'video',
          maxResults: '24',
          order: searchQuery ? 'relevance' : 'viewCount',
          q: searchQuery ? `${searchQuery} gameplay` : DEFAULT_QUERY,
          videoEmbeddable: 'true',
          videoSyndicated: 'true',
          videoCategoryId: '20',
          safeSearch: 'strict',
          key: apiKey,
        });

        const response = await fetch(`${YOUTUBE_API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch YouTube videos');
        }

        const data = await response.json();
        const nextVideos: YouTubeVideo[] = (data.items ?? [])
          .map((item: any) => ({
            videoId: item.id?.videoId,
            title: item.snippet?.title ?? 'Untitled video',
            channelTitle: item.snippet?.channelTitle,
          }))
          .filter((video: YouTubeVideo) => Boolean(video.videoId));

        setVideos(nextVideos);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setVideos([]);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    return () => controller.abort();
  }, [searchQuery]);

  return { videos, loading, error };
}
