"use client";
import { ListContent, LoaderContent, SearchInput } from "./Components";
import { Button, Grid, Typography } from "@mui/material";
import { sendMessageToChatGPT } from "./api";
import { ChangeEvent, useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "./firebase.config";

export default function Home() {
  const [whatILike, setWhatILike] = useState("");
  const [whatMyCoupleLike, setWhatMyCoupleLike] = useState("");
  const sendMessageToChatGPTCallback = useAsyncCallback(sendMessageToChatGPT);
  useEffect(() => {
    if (typeof window !== "undefined") {
      logEvent(getAnalytics(app), "page_view", {
        page_location: "/",
        page_path: "/",
        page_title: "Coupleflix",
      });
    }
  }, []);
  function handleChangeWhatILike(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const category = event.target.value;
    if (!category.length) {
      return;
    }

    logEventToFirebase(category);
    setWhatILike(category);
  }

  function handleChangeWhatMyCoupleLike(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const category = event.target.value;
    if (!category.length) {
      return;
    }

    logEventToFirebase(category);
    setWhatMyCoupleLike(category);
  }

  async function handleSendMessageToChatGPT() {
    const message = `Eu gosto de séries e filmes do tipo de categoria: ${whatILike} e meu parceiro/parceira  gosta de ${whatMyCoupleLike}`;
    await sendMessageToChatGPTCallback.execute(message);
  }
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
          variant="standard"
          value={whatILike}
          onChange={handleChangeWhatILike}
          fullWidth
        />
      </Grid>

      <Grid item lg={5} xs={6} md={5}>
        <SearchInput
          label="O que meu/minha parceiro(a) gosta"
          variant="standard"
          value={whatMyCoupleLike}
          onChange={handleChangeWhatMyCoupleLike}
          fullWidth
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
        <Button variant="contained" onClick={handleSendMessageToChatGPT}>
          Pesquisar
        </Button>
      </Grid>
      <LoaderContent
        loading={sendMessageToChatGPTCallback.loading}
        error={sendMessageToChatGPTCallback.error}
        customErrorMessage={
          <Typography variant="body1">
            Não foi possível carregar as recomendações. Tente novamente
          </Typography>
        }
        result={sendMessageToChatGPTCallback.result}
      >
        {(result) => (
          <>
            <Grid item xs={12} m={4}>
              <Typography
                variant="body2"
                fontWeight="500"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Com base no que vocês gostam aqui está uma lista de séries que
                vocês podem assistir juntos(as):
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ListContent items={["Game of thrones", "Romance", "Alem"]} />
            </Grid>
          </>
        )}
      </LoaderContent>
    </Grid>
  );
}

function logEventToFirebase(search: string) {
  if (typeof window !== "undefined") {
    logEvent(getAnalytics(app), "search", {
      search_term: search,
    });
  }
}
