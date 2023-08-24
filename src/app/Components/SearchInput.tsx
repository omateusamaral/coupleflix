import { Autocomplete, TextField, Typography } from "@mui/material";
import { GenreType, listMoviesGenres, listTvSeriesGenres } from "../api";
import { useAsyncCallback } from "react-async-hook";
import { ReactNode, Suspense, useEffect } from "react";
import i18next from "i18next";
interface SearchInputProps {
  label: string | ReactNode;
  onChange: (event: unknown, values: GenreType[]) => void;
  value: GenreType[];
}
export function SearchInput({ label, onChange, value }: SearchInputProps) {
  const listMoviesGenresCallback = useAsyncCallback(listMoviesGenres);
  const listTvSeriesGenresCallback = useAsyncCallback(listTvSeriesGenres);
  const LANGUAGE = i18next.language;
  useEffect(() => {
    listMoviesGenresCallback.execute(LANGUAGE);
    listTvSeriesGenresCallback.execute(LANGUAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LANGUAGE]);
  return (
    <Suspense fallback={<Typography>tente novamente</Typography>}>
      <Autocomplete
        multiple
        disablePortal
        options={listMoviesGenresCallback.result ?? []}
        onChange={onChange}
        value={value}
        getOptionLabel={(option: GenreType) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" fullWidth label={label} />
        )}
      />
    </Suspense>
  );
}
