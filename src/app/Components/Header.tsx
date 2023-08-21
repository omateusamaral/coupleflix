import { Grid, Typography, Button } from "@mui/material";
import { SearchInput } from "./SearchInput";
import { GenreType } from "../api";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "../firebase.config";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";
import Image from "next/image";

interface HeaderProps {
  onChangeWhaILike: (values: GenreType[]) => void;
  onChangeWhaMyCoupleLike: (values: GenreType[]) => void;
  onListContent: () => Promise<void>;
  whatILike: GenreType[];
  whatMyCoupleLike: GenreType[];
}
export function Header({
  onChangeWhaILike,
  onChangeWhaMyCoupleLike,
  onListContent,
  whatILike,
  whatMyCoupleLike,
}: HeaderProps) {
  const { t } = useTranslation();
  function handleChangeWhatILike(event: unknown, values: GenreType[]) {
    handleCoupleLikes("me", values);
  }

  function handleChangeWhatMyCoupleLike(event: unknown, values: GenreType[]) {
    logSearchToFirebase(values.toString());
    handleCoupleLikes("my-couple", values);
  }

  function handleCoupleLikes(person: "me" | "my-couple", values: GenreType[]) {
    logSearchToFirebase(values.toString());
    if (person === "me") {
      onChangeWhaILike(values);
    } else {
      onChangeWhaMyCoupleLike(values);
    }
  }
  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
  };
  return (
    <Grid container spacing={2} alignItems="flex-end" padding={1}>
      <Grid item xs={6}>
        <Button onClick={() => changeLanguage("pt-BR")}>
          <Image
            src="https://cdn-icons-png.flaticon.com/128/7826/7826359.png"
            alt="flag-image"
            width={20}
            height={20}
          />
        </Button>
        <Button onClick={() => changeLanguage("en")}>
          <Image
            src="https://cdn-icons-png.flaticon.com/128/3909/3909383.png"
            alt="flag-image"
            width={20}
            height={20}
          />
        </Button>
      </Grid>
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
          <Trans t={t}>Que categoria de séries/filmes vocês gostam?</Trans>
        </Typography>
      </Grid>
      <Grid item lg={6} xs={6} md={6}>
        <SearchInput
          label={
            <Typography sx={{ typography: { sm: "body1", xs: "body2" } }}>
              <Trans t={t}>O que eu gosto</Trans>
            </Typography>
          }
          onChange={handleChangeWhatILike}
          value={whatILike}
        />
      </Grid>

      <Grid item lg={5} xs={6} md={5}>
        <SearchInput
          label={
            <Typography sx={{ typography: { sm: "body1", xs: "caption" } }}>
              <Trans t={t}>O que meu/minha parceiro(a) gosta</Trans>
            </Typography>
          }
          onChange={handleChangeWhatMyCoupleLike}
          value={whatMyCoupleLike}
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
        <Button
          variant="contained"
          disabled={whatILike.length === 0 || whatMyCoupleLike.length === 0}
          onClick={onListContent}
        >
          <Trans t={t}>Pesquisar</Trans>
        </Button>
      </Grid>
    </Grid>
  );
}

function logSearchToFirebase(search: string) {
  if (typeof window !== "undefined") {
    logEvent(getAnalytics(app), "search", {
      search_term: search,
    });
  }
}
