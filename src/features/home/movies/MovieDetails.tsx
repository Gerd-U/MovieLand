import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../../../service/Movie.service";
import type { Movie } from "../../../models/movies.models";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  // 1. Creamos un estado para la película
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  // 2. Buscamos la película al cargar el componente
  useEffect(() => {
    if (id) {
      getMovieById(id)
        .then((data) => setMovie(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando detalles...</div>;
  
  // 3. Si no existe la película, mostramos error
  if (!movie) return <div className="p-10 text-center">Película no encontrada</div>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Link to="/movies" className="text-indigo-600 text-sm font-bold">← Volver</Link>
      
      <div className="mt-6 flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
        {/* Póster dinámico */}
        <div className="w-full md:w-64 shrink-0">
          <img 
            src={movie.image} 
            className="rounded-xl shadow-md w-full object-cover aspect-[2/3]"
            alt={movie.title}
          />
        </div>

        {/* Info dinámica */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-black text-slate-900">{movie.title}</h1>
          <div className="flex gap-2 my-3">
            <span className="text-slate-400 text-sm">ID: {movie.id} • Película</span>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            {movie.description}
          </p>
          <button className="w-fit bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all">
            Ver Ahora
          </button>
        </div>
      </div>
    </div>
  );
}