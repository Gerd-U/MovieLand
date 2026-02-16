import type { Movie } from "../../../models/movies.models";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const numericRating = Number(movie.rating);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-red-600"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón cerrar */}
        <div className="sticky top-0 bg-gray-900 border-b border-red-600 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-red-600">Detalles de la Película</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-red-600 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Imagen de la película */}
            <div className="md:w-1/3">
              {movie.image && movie.image !== "N/A" ? (
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-700 flex items-center justify-center rounded-lg">
                  <span className="text-gray-400">Sin imagen disponible</span>
                </div>
              )}
            </div>

            {/* Información de la película */}
            <div className="md:w-2/3 text-white">
              <h1 className="text-4xl font-extrabold mb-4 text-red-500">
                {movie.title}
              </h1>

              {/* Rating con estrellas */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <span key={`full-${i}`} className="text-red-600 text-2xl">★</span>
                  ))}
                  {hasHalfStar && <span className="text-red-600 text-2xl">☆</span>}
                  {Array.from({ length: emptyStars }).map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-500 text-2xl">★</span>
                  ))}
                </div>
                <span className="text-gray-300 text-lg font-semibold">
                  {numericRating}/5
                </span>
              </div>

              {/* ID de la película */}
              <div className="mb-4">
                <span className="text-gray-400 text-sm">
                  ID: <span className="text-white font-semibold">{movie.id}</span>
                </span>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-red-500 mb-2">Descripción</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
