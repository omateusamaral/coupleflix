import {
  List,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Rating,
  Grid,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { Content } from "../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../firebase.config";

interface ListContentProps {
  items: Content[];
  handlePage: (page: number) => void;
  page: number;
}
export function ListContent({ items, handlePage, page }: ListContentProps) {
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
            Infelizmente não conseguimos encontrar nenhum filme/série com base
            nos seus gostos 🥹. tente novamente
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={2}>
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
      <List
        dense
        component="div"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <Card sx={{ maxWidth: 300 }} key={item.id} variant="elevation">
            <CardActionArea>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="p">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.overview}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Stack direction="column">
                <Rating
                  name="read-only"
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#ff6d75",
                    },
                  }}
                  value={item.vote_average}
                  max={10}
                  readOnly
                />
                <Typography variant="body2">
                  Data de lançamento: {item.release_date}
                </Typography>
              </Stack>
            </CardActions>
          </Card>
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
    </Grid>
  );
}
