import { useState } from "react";
import type { Movie } from "../../../models/movies.models";

type Review = {
  id: number;
  author: string;
  comment: string;
  rating: number;
  date: string;
  likes: number;
  likedByMe: boolean;
};

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const numericRating = Number(movie.rating);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [authorInput, setAuthorInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [ratingInput, setRatingInput] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = () => {
    if (!commentInput.trim() || !authorInput.trim()) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        author: authorInput.trim(),
        comment: commentInput.trim(),
        rating: ratingInput,
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        likes: 0,
        likedByMe: false,
      },
      ...prev,
    ]);
    setAuthorInput("");
    setCommentInput("");
    setRatingInput(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const handleLike = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              likes: r.likedByMe ? r.likes - 1 : r.likes + 1,
              likedByMe: !r.likedByMe,
            }
          : r
      )
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-red-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 border-b border-red-600 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-red-600">Detalles de la Película</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-600 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
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

            <div className="md:w-2/3 text-white">
              <h1 className="text-4xl font-extrabold mb-4 text-red-500">
                {movie.title}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <span key={`full-${i}`} className="text-red-600 text-2xl">★</span>
                  ))}
                  {hasHalfStar && (
                    <span className="text-red-600 text-2xl">☆</span>
                  )}
                  {Array.from({ length: emptyStars }).map((_, i) => (
                    <span key={`empty-${i}`} className="text-gray-500 text-2xl">★</span>
                  ))}
                </div>
                <span className="text-gray-300 text-lg font-semibold">
                  {numericRating}/5
                </span>
              </div>

              <div className="mb-4">
                <span className="text-gray-400 text-sm">
                  ID: <span className="text-white font-semibold">{movie.id}</span>
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-red-500 mb-2">Descripción</h3>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-red-500">✍️</span> Reseñas de usuarios
              {reviews.length > 0 && (
                <span className="ml-2 bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                  {reviews.length}
                </span>
              )}
            </h3>

            <div className="bg-gray-800 rounded-xl p-5 mb-8 border border-gray-700 shadow-inner">
              <p className="text-gray-400 text-sm mb-4 font-medium uppercase tracking-wide">
                Deja tu reseña
              </p>

              <input
                type="text"
                placeholder="Tu nombre o apodo..."
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                maxLength={40}
                className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 mb-3 outline-none focus:ring-2 focus:ring-red-500 transition"
              />

              <div className="flex items-center gap-1 mb-3">
                <span className="text-gray-400 text-sm mr-2">Tu puntuación:</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRatingInput(i + 1)}
                    onMouseEnter={() => setHoveredStar(i + 1)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className={`text-2xl transition-transform hover:scale-125 ${
                      i < (hoveredStar || ratingInput) ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-gray-400 text-sm ml-2">
                  {hoveredStar || ratingInput}/5
                </span>
              </div>

              <textarea
                placeholder="Cuéntanos qué te pareció..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 mb-1 outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
              />
              <div className="text-right text-gray-500 text-xs mb-3">
                {commentInput.length}/500
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={!commentInput.trim() || !authorInput.trim()}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg transition-colors"
              >
                Publicar reseña
              </button>

              {submitted && (
                <p className="text-green-400 text-center mt-3 text-sm animate-pulse">
                  ✅ ¡Reseña publicada con éxito!
                </p>
              )}
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p className="text-4xl mb-3">🎥</p>
                <p className="text-lg">Sé el primero en dejar una reseña</p>
                <p className="text-sm mt-1">Tu opinión puede ayudar a otros.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-red-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{review.author}</p>
                          <p className="text-gray-500 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-base ${
                              i < review.rating ? "text-red-500" : "text-gray-600"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed pl-11 mb-3">
                      {review.comment}
                    </p>

                    <div className="pl-11">
                      <button
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border transition-all duration-200 ${
                          review.likedByMe
                            ? "bg-red-600 border-red-500 text-white scale-105"
                            : "bg-transparent border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400"
                        }`}
                      >
                        <span className="text-base leading-none">
                          {review.likedByMe ? "❤️" : "🤍"}
                        </span>
                        <span className="font-semibold">{review.likes}</span>
                        <span>{review.likes === 1 ? "like" : "likes"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}