import type { Movie } from "../../../models/movies.models";
import { MoviesCard } from "./MoviesCard";

type MoviesListProps = {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
};

export function MoviesList({ movies, onMovieClick }: MoviesListProps) {
  return (
    <div className="bg-black text-white p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          description={movie.description}
          image={movie.image}
          rating={movie.rating}
          onClick={() => onMovieClick(movie)}
        />
      ))}
    </div>
  );
}