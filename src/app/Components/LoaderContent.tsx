import { CircularProgress, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Content } from "../api";

interface LoaderContentProps {
  loading: boolean;
  children: (result: Content[]) => ReactNode;
  error?: Error;
  customErrorMessage?: ReactNode;
  result?: Content[];
}

export function LoaderContent({
  loading,
  children,
  customErrorMessage,
  error,
  result,
}: LoaderContentProps) {
  if (loading) {
    return (
      <Grid container spacing={1} p={4}>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  if (!loading && error) {
    if (customErrorMessage) {
      return (
        <Grid container spacing={1} p={4}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {customErrorMessage}
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={2} p={4}>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1">Não foi possível carregar.</Typography>
        </Grid>
      </Grid>
    );
  }

  if (!result) {
    return (
      <Grid container spacing={2} p={4}>
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
      </Grid>
    );
  }
  return <>{children(result)}</>;
}
