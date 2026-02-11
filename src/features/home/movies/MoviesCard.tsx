import type { Movie } from "../../../models/movies.models";

export function MoviesCard({ title, description, image, rating }: Movie) {
  const numericRating = Number(rating);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
  <div className="bg-gray-800 rounded-lg shadow p-4 flex flex-col">
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
    <p className="text-sm text-gray-400 mb-2">{description}</p>

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