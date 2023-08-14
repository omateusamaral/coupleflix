"use client";
import { Header, ListContent, LoaderContent } from "./Components";
import { Grid, Typography } from "@mui/material";
import { Content, GenreType, listMoviesAndFilm } from "./api";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "./firebase.config";

export default function Home() {
  const [whatILike, setWhatILike] = useState<GenreType[]>([]);
  const [whatMyCoupleLike, setWhatMyCoupleLike] = useState<GenreType[]>([]);
  const [page, setPage] = useState<number>(1);
  const listMoviesAndFilmCallback = useAsyncCallback(listMoviesAndFilm);
  useEffect(() => {
    if (typeof window !== "undefined") {
      logEvent(getAnalytics(app), "page_view", {
        page_location: "/",
        page_path: "/",
        page_title: "Coupleflix",
      });
    }
  }, []);

  const handleListContent = async () => {
    const genresIds = whatILike
      .filter((x) => !whatMyCoupleLike.includes(x))
      .map((y) => y.id)
      .join(",");
    await listMoviesAndFilmCallback.execute(genresIds, page);
  };

  useEffect(() => {
    if (page > 1) {
      handleListContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Grid container spacing={2} alignItems="flex-end" padding={1}>
      <Header
        onChangeWhaILike={setWhatILike}
        onChangeWhaMyCoupleLike={setWhatMyCoupleLike}
        onListContent={handleListContent}
        whatILike={whatILike}
        whatMyCoupleLike={whatMyCoupleLike}
      />

      <LoaderContent
        loading={listMoviesAndFilmCallback.loading}
        error={listMoviesAndFilmCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            Não foi possível carregar as recomendações. Tente novamente
          </Typography>
        }
        result={listMoviesAndFilmCallback.result}
      >
        {(result: Content[]) => (
          <ListContent handlePage={setPage} page={page} items={result} />
        )}
      </LoaderContent>
    </Grid>
  );
}
