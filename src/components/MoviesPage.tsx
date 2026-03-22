
import React, { useState, useMemo } from "react";
import movies from "../data/movies.json";


const MoviesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const filteredMovies = useMemo(() => {
    const q = search.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(q) ||
        (movie.description && movie.description.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <div className="flex justify-center mb-8">
        <input
          id="movies-search"
          name="movies-search"
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 px-4 text-base text-zinc-900 dark:text-zinc-100 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length === 0 ? (
          <div className="col-span-full text-center text-zinc-500 dark:text-zinc-400 text-lg py-12">No movies found.</div>
        ) : (
          filteredMovies.map((movie) => (
            <div
              key={movie.link}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform"
            >
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">{movie.title}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2 flex-1">{movie.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-zinc-500">{movie.year}</span>
                  <a
                    href={movie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs font-medium"
                  >
                    Watch
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
