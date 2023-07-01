"use client";
import { ListContents, SearchInput } from "./Components";
import { Button, Grid, Typography } from "@mui/material";

export default function Home() {
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
        <SearchInput label="O que eu gosto" variant="standard" fullWidth />
      </Grid>

      <Grid item lg={5} xs={6} md={5}>
        <SearchInput
          label="O que meu/minha parceiro(a) gosta"
          variant="standard"
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
        <Button variant="contained">Pesquisar</Button>
      </Grid>

      <Grid item xs={12} m={4}>
        <Typography
          variant="body2"
          fontWeight="500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Com base no que vocês gostam aqui está uma lista de séries que vocês
          podem assistir juntos(as):
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ListContents items={["Game of thrones", "Romance", "Alem"]} />
      </Grid>
    </Grid>
  );
}
