import type { Movie } from "../../../models/movies.models";

type MoviesCardProps = Movie & {
  onClick: () => void;
};

export function MoviesCard({ title, description, image, rating, onClick }: MoviesCardProps) {
  const numericRating = Number(rating);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Función para truncar la descripción
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
  <div 
    className="bg-gray-800 rounded-lg shadow p-4 flex flex-col cursor-pointer hover:bg-gray-700 transition-colors"
    onClick={onClick}
  >
    {image && image !== "N/A" ? (
      <div className="w-full h-64 bg-black flex items-center justify-center rounded mb-3">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-h-full object-contain rounded"
        />
      </div>
    ) : (
      <div className="w-full h-64 bg-gray-600 flex items-center justify-center rounded mb-3">
        <span className="text-gray-300 text-sm">Sin imagen</span>
      </div>
    )}

    <h2 className="text-lg font-bold mb-1">{title}</h2>
    
    {/* Descripción truncada con "Leer más" */}
    <p className="text-sm text-gray-400 mb-2">
      {truncateText(description, 100)}
      {description.length > 100 && (
        <span className="text-red-500 font-semibold ml-1 hover:text-red-400">
          Leer más
        </span>
      )}
    </p>

    {/* Bloque de rating */}
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-red-600">★</span>
      ))}

      {hasHalfStar && <span className="text-red-600">☆</span>}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-500">★</span>
      ))}

      <span className="text-gray-400 text-sm ml-2">({numericRating}/5)</span>
    </div>
  </div>
);
}