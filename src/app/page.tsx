"use client";
import { Header, ListContent, LoaderContent } from "./Components";
import { Grid, Typography } from "@mui/material";
import { Content, GenreType, listMovies, listSeries } from "./api";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "./firebase.config";

export default function Home() {
  const [whatILike, setWhatILike] = useState<GenreType[]>([]);
  const [whatMyCoupleLike, setWhatMyCoupleLike] = useState<GenreType[]>([]);
  const [page, setPage] = useState<number>(1);
  const listMoviesCallback = useAsyncCallback(listMovies);
  const listSeriesCallback = useAsyncCallback(listSeries);

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
    await listMoviesCallback.execute(genresIds, page);
    await listSeriesCallback.execute(genresIds, page);
  };

  useEffect(() => {
    if (page > 1) {
      handleListContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log("aaaa", listMoviesCallback.status, listSeriesCallback.status);
  return (
    <Grid container spacing={2} padding={1}>
      <Header
        onChangeWhaILike={setWhatILike}
        onChangeWhaMyCoupleLike={setWhatMyCoupleLike}
        onListContent={handleListContent}
        whatILike={whatILike}
        whatMyCoupleLike={whatMyCoupleLike}
      />

      {listMoviesCallback.status === "not-requested" ||
      listSeriesCallback.status === "not-requested" ? (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1">
            Aqui vai aparecer filmes e séries com base nos seus gostos 😀
          </Typography>
        </Grid>
      ) : null}
      <LoaderContent
        loading={listMoviesCallback.loading}
        error={listMoviesCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            Não foi possível carregar os filmes. Tente novamente
          </Typography>
        }
        result={listMoviesCallback.result}
      >
        {(result: Content[]) => (
          <ListContent
            handlePage={setPage}
            page={page}
            title="Filmes"
            items={result}
          />
        )}
      </LoaderContent>

      <LoaderContent
        loading={listSeriesCallback.loading}
        error={listSeriesCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            Não foi possível carregar as séries. Tente novamente
          </Typography>
        }
        result={listSeriesCallback.result}
      >
        {(result: Content[]) => (
          <ListContent
            handlePage={setPage}
            page={page}
            title="Séries"
            items={result}
          />
        )}
      </LoaderContent>
    </Grid>
  );
}
