import { useState, useMemo } from 'react';
import { YouTubeVideo } from '../components/YouTubeCard';

// Curated YouTube videos - gaming, tech, and entertainment
const CURATED_VIDEOS: YouTubeVideo[] = [
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    channelTitle: 'Rick Astley',
    viewCount: '1.5B'
  },
  {
    videoId: 'jNQXAC9IVRw',
    title: 'Me at the zoo',
    channelTitle: 'jawed',
    viewCount: '300M'
  },
  {
    videoId: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE',
    channelTitle: 'officialpsy',
    viewCount: '5.1B'
  },
  {
    videoId: 'kJQP7kiw5Fk',
    title: 'Despacito',
    channelTitle: 'Luis Fonsi',
    viewCount: '8.4B'
  },
  {
    videoId: 'hTWKbfoikeg',
    title: 'Nirvana - Smells Like Teen Spirit',
    channelTitle: 'Nirvana',
    viewCount: '1.8B'
  },
  {
    videoId: 'fJ9rUzIMcZQ',
    title: 'Queen - Bohemian Rhapsody',
    channelTitle: 'Queen Official',
    viewCount: '2.1B'
  },
  {
    videoId: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You',
    channelTitle: 'Ed Sheeran',
    viewCount: '6.2B'
  },
  {
    videoId: 'RgKAFK5djSk',
    title: 'Wiz Khalifa - See You Again ft. Charlie Puth',
    channelTitle: 'Wiz Khalifa',
    viewCount: '6.4B'
  },
  {
    videoId: 'hTWKbfoikeg',
    title: 'Nirvana - Smells Like Teen Spirit',
    channelTitle: 'Nirvana',
    viewCount: '1.8B'
  },
  {
    videoId: 'kffacxfA7G4',
    title: 'Maroon 5 - Sugar',
    channelTitle: 'Maroon 5',
    viewCount: '4.1B'
  },
  {
    videoId: 'y6120QOlsfU',
    title: 'Darude - Sandstorm',
    channelTitle: 'DarudeVEVO',
    viewCount: '200M'
  },
  {
    videoId: 'CevxZvSJLk8',
    title: 'Katy Perry - Firework',
    channelTitle: 'Katy Perry',
    viewCount: '3.2B'
  }
];

export function useYouTube() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return CURATED_VIDEOS;
    const query = searchQuery.toLowerCase();
    return CURATED_VIDEOS.filter(video =>
      video.title.toLowerCase().includes(query) ||
      video.channelTitle?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return { videos: filteredVideos, searchQuery, setSearchQuery };
}
