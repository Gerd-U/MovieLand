import { useEffect, useState } from "react";
import { MoviesList } from "./MoviesList";
import { MovieModal } from "./MovieModal";
import { getMovies } from "../../../service/Movie.service";
import type { Movie } from "../../../models/movies.models";

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-black p-4 border-t border-red-600 text-center mb-0">
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 drop-shadow-lg">
        🎬 Lista de Películas
      </h1>
      <MoviesList movies={movies} onMovieClick={handleMovieClick} />
      
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}