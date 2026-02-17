import { useEffect, useState } from "react";
import { MoviesList } from "./MoviesList";
import { MovieModal } from "./MovieModal";
import { getMovies } from "../../../service/Movie.service";
import type { Movie } from "../../../models/movies.models";

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // ← NUEVO
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // ← NUEVO

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); // ← Inicializar películas filtradas
      })
      .finally(() => setLoading(false));
  }, []);

  // ← NUEVO: Filtrar películas cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  // ← NUEVO: Manejar cambios en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ← NUEVO: Limpiar búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Cargando películas...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4 border-t border-red-600">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 drop-shadow-lg text-center mb-6">
          🎬 Lista de Películas
        </h1>

        {/* ← NUEVO: Barra de búsqueda */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar películas por título o descripción..."
              className="w-full px-4 py-3 pl-12 pr-12 bg-gray-900 border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
            />
            {/* Icono de búsqueda */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Botón para limpiar */}
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="mt-2 text-center">
            <span className="text-gray-400 text-sm">
              {filteredMovies.length === movies.length
                ? `Mostrando todas las películas (${movies.length})`
                : `${filteredMovies.length} de ${movies.length} películas encontradas`}
            </span>
          </div>
        </div>

        {/* Usar filteredMovies en lugar de movies */}
        {filteredMovies.length > 0 ? (
          <MoviesList movies={filteredMovies} onMovieClick={handleMovieClick} />
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl text-white mb-2">
              No se encontraron películas
            </h2>
            <p className="text-gray-400">
              Intenta con otro término de búsqueda
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
