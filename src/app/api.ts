import axios from "axios";
import i18next from "i18next";

export type GenreType = {
  id: number;
  name: string;
};
export async function listMovies(
  genresIds: string,
  language: string,
  page = 1
): Promise<Content[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genresIds}&page=${page}&language=${language}`
    );

    return response.data.results;
  } catch (error) {
    throw error;
  }
}

export async function listSeries(
  genresIds: string,
  language: string,
  page = 1
): Promise<Content[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genresIds}&page=${page}&language=${language}`
    );

    return response.data.results;
  } catch (error) {
    throw error;
  }
}

export async function listMoviesGenres(language: string): Promise<GenreType[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`
    );

    return response.data.genres;
  } catch (error) {
    throw error;
  }
}

export async function listTvSeriesGenres(
  language: string
): Promise<GenreType[]> {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`
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
  name?: string;
  first_air_date?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
