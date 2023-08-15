import { List, Typography, Grid, Button, Alert, Snackbar } from "@mui/material";
import { Content } from "../api";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../firebase.config";
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
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);

    if (typeof window !== "undefined") {
      logEvent(getAnalytics(app), "view_search_results", {
        search_term: "like the results",
      });
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  function handleUpdatePage() {
    handlePage(page + 1);
  }
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
        <Button
          variant="outlined"
          endIcon={<ThumbUpOutlinedIcon />}
          color="success"
          sx={{
            mr: 1,
          }}
          onClick={handleOpenSnackbar}
        >
          Gostei
        </Button>
        <Button
          variant="outlined"
          endIcon={<ThumbDownOutlinedIcon />}
          color="error"
          onClick={handleUpdatePage}
        >
          Recomendar outros
        </Button>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
          closeText="fechar"
        >
          Obrigado pelo feedback
        </Alert>
      </Snackbar>
    </>
  );
}
