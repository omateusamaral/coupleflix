import { Grid, Typography, Button } from "@mui/material";
import { SearchInput } from "./SearchInput";
import { GenreType } from "../api";
import { logEvent, getAnalytics } from "firebase/analytics";
import { app } from "../firebase.config";

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
  return (
    <Grid container spacing={2} alignItems="flex-end" padding={1}>
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
          onChange={handleChangeWhatILike}
          value={whatILike}
        />
      </Grid>

      <Grid item lg={5} xs={6} md={5}>
        <SearchInput
          label="O que meu/minha parceiro(a) gosta"
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
          Pesquisar
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
