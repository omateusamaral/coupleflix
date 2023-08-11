import {
  Autocomplete,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { listMoviesGenres, listTvSeriesGenres } from "../api";
import { useAsyncCallback } from "react-async-hook";
import { Suspense, useEffect, useState } from "react";
interface SearchInputProps {
  label: string;
  onChange: (event: unknown, values: { id: number; name: string }[]) => void;
}
export function SearchInput({ label, onChange }: SearchInputProps) {
  const listMoviesGenresCallback = useAsyncCallback(listMoviesGenres);
  const listTvSeriesGenresCallback = useAsyncCallback(listTvSeriesGenres);

  useEffect(() => {
    listMoviesGenresCallback.execute();
    listTvSeriesGenresCallback.execute();
  }, []);
  return (
    <Suspense fallback={<Typography>tente novamente</Typography>}>
      <Autocomplete
        multiple
        disablePortal
        options={listMoviesGenresCallback.result ?? []}
        onChange={onChange}
        getOptionLabel={(option: { id: number; name: string }) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" fullWidth label={label} />
        )}
      />
    </Suspense>
  );
}
