import type { Movie } from "../models/movies.models";

const MOVIES_URL = "/movies.json"; // al estar en public

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(MOVIES_URL);

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar el movies.json (status ${response.status})`
    );
  }

  const data = await response.json();
  console.log("Películas cargadas: ", data);
  return data as Movie[];
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const movies = await getMovies();
  const found = movies.find((m) => String(m.id) === String(id));
  return found ?? null;
}