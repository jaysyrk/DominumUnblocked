import { useState, useEffect, useMemo } from 'react';
import { Game } from '../types';
import { ZONES_URL } from '../constants';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(ZONES_URL);
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        // Filter out games with IDs outside the expected range if needed
        setGames(data.filter((g: Game) => g.id >= 0));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return games;
    const query = searchQuery.toLowerCase();
    return games.filter(g => g.name.toLowerCase().includes(query));
  }, [games, searchQuery]);

  return { games: filteredGames, loading, error, searchQuery, setSearchQuery };
}
