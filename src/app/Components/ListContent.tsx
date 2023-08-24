import { List, Typography, Grid } from "@mui/material";
import { Content } from "../api";

import { CardContent } from "./CardContent";
import { useTranslation } from "react-i18next";

interface ListContentProps {
  items: Content[];

  title: string;
}
export function ListContent({
  items,

  title,
}: ListContentProps) {
  const { t } = useTranslation();

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
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight="700">
          {t(title)}
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
