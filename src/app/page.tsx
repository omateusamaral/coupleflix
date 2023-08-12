"use client";
import { ListContent, LoaderContent, SearchInput } from "./Components";
import { Button, Grid, Typography } from "@mui/material";
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
  function handleChangeWhatILike(event: unknown, values: GenreType[]) {
    handleCoupleLikes("me", values);
  }

  function handleChangeWhatMyCoupleLike(event: unknown, values: GenreType[]) {
    logSearchToFirebase(values.toString());
    handleCoupleLikes("my-couple", values);
  }

  function handleCoupleLikes(person: "me" | "my-couple", values: GenreType[]) {
    logSearchToFirebase(values.toString());
    if (person === "me") {
      setWhatILike(values);
    } else {
      setWhatMyCoupleLike(values);
    }
  }
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
  }, [page]);

  console.log(page);
  return (
    <Grid container spacing={1} alignItems="flex-end" padding={1}>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Coupleflix
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1">
          Que categoria de séries/filmes vocês gostam?
        </Typography>
      </Grid>
      <Grid item lg={6} xs={6} md={6}>
        <SearchInput
          label="O que eu gosto"
          onChange={handleChangeWhatILike}
          value={whatILike}
        />
      </Grid>

      <Grid item lg={5} xs={6} md={5}>
        <SearchInput
          label="O que meu/minha parceiro(a) gosta"
          onChange={handleChangeWhatMyCoupleLike}
          value={whatMyCoupleLike}
        />
      </Grid>
      <Grid
        item
        lg={1}
        xs={12}
        md={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button variant="contained" onClick={handleListContent}>
          Pesquisar
        </Button>
      </Grid>

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

function logSearchToFirebase(search: string) {
  if (typeof window !== "undefined") {
    logEvent(getAnalytics(app), "search", {
      search_term: search,
    });
  }
}
