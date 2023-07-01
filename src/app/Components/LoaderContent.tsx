import { CircularProgress, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LoaderContentProps {
  loading: boolean;
  children: (result: string) => ReactNode;
  error?: Error;
  customErrorMessage?: ReactNode;
  result?: string;
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
      <Grid container spacing={1} p={4}>
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
    return <></>;
  }
  return <>{children(result)}</>;
}
