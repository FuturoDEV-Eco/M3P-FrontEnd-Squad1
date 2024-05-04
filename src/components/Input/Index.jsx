import { TextField } from "@mui/material";

function Input({ id, label, type, helperText, error, register, ...props }) {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      helperText={helperText}
      error={error}
      {...register}
      {...props}
    />
  );
}

export default Input;
