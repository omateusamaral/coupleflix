"use client";
import {
  FeedbackButton,
  Header,
  ListContent,
  LoaderContent,
} from "./Components";
import { Grid, Typography } from "@mui/material";
import { Content, GenreType, listMovies, listSeries } from "./api";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "./firebase.config";
import i18next from "i18next";
import { Trans, initReactI18next, useTranslation } from "react-i18next";
import { resources } from "./i18n";

i18next.use(initReactI18next).init({
  resources: resources,
  fallbackLng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
  react: {
    defaultTransParent: "span",
  },
});
export default function Home() {
  const [whatILike, setWhatILike] = useState<GenreType[]>([]);
  const [whatMyCoupleLike, setWhatMyCoupleLike] = useState<GenreType[]>([]);
  const [page, setPage] = useState<number>(1);
  const listMoviesCallback = useAsyncCallback(listMovies);
  const listSeriesCallback = useAsyncCallback(listSeries);
  const { t } = useTranslation();

  const LANGUAGE = i18next.language;
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
    await listMoviesCallback.execute(genresIds, LANGUAGE, page);
    await listSeriesCallback.execute(genresIds, LANGUAGE, page);
  };

  useEffect(() => {
    if (page > 1) {
      handleListContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
            <Trans t={t}>
              Aqui vai aparecer filmes e séries com base nos seus gostos 😀
            </Trans>
          </Typography>
        </Grid>
      ) : null}
      <LoaderContent
        loading={listMoviesCallback.loading}
        error={listMoviesCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            <Trans t={t}>
              Não foi possível carregar os filmes. Tente novamente
            </Trans>
          </Typography>
        }
        result={listMoviesCallback.result}
      >
        {(result: Content[]) => (
          <>
            <FeedbackButton onPage={setPage} page={page} />
            <Grid item xs={12} m={4}>
              <Typography
                variant="body2"
                fontWeight="500"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Trans t={t}>
                  Com base no que vocês gostam aqui está uma lista de filmes e
                  séries que vocês podem assistir juntos(as):
                </Trans>
              </Typography>
            </Grid>
            <ListContent title="Filmes" items={result} />
          </>
        )}
      </LoaderContent>

      <LoaderContent
        loading={listSeriesCallback.loading}
        error={listSeriesCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            <Trans t={t}>
              Não foi possível carregar as séries. Tente novamente
            </Trans>
          </Typography>
        }
        result={listSeriesCallback.result}
      >
        {(result: Content[]) => (
          <>
            <ListContent title="Séries" items={result} />

            <FeedbackButton onPage={setPage} page={page} />
          </>
        )}
      </LoaderContent>
    </Grid>
  );
}
