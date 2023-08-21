import { Grid, Button, Alert, Snackbar, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useState } from "react";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../firebase.config";
import { Trans, useTranslation } from "react-i18next";

interface FeedbackButtonProps {
  onPage: (page: number) => void;
  page: number;
}
export function FeedbackButton({ onPage, page }: FeedbackButtonProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { t } = useTranslation();

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
    onPage(page + 1);
  }
  return (
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
        <Typography sx={{ typography: { sm: "body1", xs: "body2" } }}>
          <Trans t={t}>Gostei</Trans>
        </Typography>
      </Button>
      <Button
        variant="outlined"
        endIcon={<ThumbDownOutlinedIcon />}
        color="error"
        onClick={handleUpdatePage}
      >
        <Typography sx={{ typography: { sm: "body1", xs: "body2" } }}>
          <Trans t={t}>Recomendar outros</Trans>
        </Typography>
      </Button>
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
          <Trans t={t}>Obrigado pelo feedback</Trans>
        </Alert>
      </Snackbar>
    </Grid>
  );
}
