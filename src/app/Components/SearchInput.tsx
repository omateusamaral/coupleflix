import { TextField, TextFieldProps } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
export function SearchInput({ label, ...rest }: TextFieldProps) {
  return (
    <TextField
      label={label}
      {...rest}
      InputProps={{
        endAdornment: <SearchRoundedIcon color="action" />,
      }}
    />
  );
}
