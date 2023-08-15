import { List, Typography, Grid } from "@mui/material";
import { Content } from "../api";

import { CardContent } from "./CardContent";

interface ListContentProps {
  items: Content[];
  handlePage: (page: number) => void;
  page: number;
  title: string;
}
export function ListContent({
  items,
  handlePage,
  page,
  title,
}: ListContentProps) {
  if (items.length === 0) {
    return (
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="body1" textAlign="center">
            Infelizmente não conseguimos encontrar conteúdo com base nos seus
            gostos 🥹. tente novamente
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <Grid item xs={12} m={4}>
        <Typography
          variant="body2"
          fontWeight="500"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Com base no que vocês gostam aqui está uma lista de filmes e séries
          que vocês podem assistir juntos(as):
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
      </Grid>
      <List
        dense
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
          paddingLeft: "5px",
        }}
      >
        {items.map((item) => (
          <CardContent item={item} key={item.id} />
        ))}
      </List>
    </>
  );
}
