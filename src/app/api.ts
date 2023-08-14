import axios from "axios";

const LANGUAGE = "pt-BR";
export type GenreType = {
  id: number;
  name: string;
};
export async function listMoviesAndFilm(
  genresIds: string,
  page = 1
): Promise<Content[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genresIds}&page=${page}&language=${LANGUAGE}`
    );

    return response.data.results;
  } catch (error) {
    throw error;
  }
}

export async function listMoviesGenres(): Promise<GenreType[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${LANGUAGE}`
    );

    return response.data.genres;
  } catch (error) {
    throw error;
  }
}

export async function listTvSeriesGenres(): Promise<GenreType[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${LANGUAGE}`
    );

    return response.data.genres;
  } catch (error) {
    throw error;
  }
}

export interface Content {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
