import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/// Text outline field props
interface TextOutlineFieldProps {
  id?: any;
  name?: string;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  secret?: boolean;
  type?: "password" | "email" | "number" | "text" | "tel" | "url" | "date";
  value?: any;
  helperText?: ReactNode | null;
  error?: boolean;
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
  multiline?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>;
  children?: ReactNode;
}

function TextOutlineField(props?: TextOutlineFieldProps) {
  const {
    id,
    name,
    value,
    label,
    prefix,
    suffix,
    secret,
    type,
    helperText,
    error,
    fullWidth,
    minRows,
    maxRows,
    multiline,
    maxLength,
    minLength,
    ref,
    onChange,
    onFocus,
  } = props ?? {};

  /// Show password state
  const [showPassword, setShowPassword] = useState(false);

  /// Changed password visibility handle
  const handleClickShowPassword = () => {
    setShowPassword((value) => !value);
  };

  /// Prefix Icon
  const startAdornment = prefix ? (
    <InputAdornment position="start" children={prefix} />
  ) : null;

  /// Suffix Icon
  const endAdornment = () => {
    if (!secret && !suffix) return null;
    let component = suffix;
    if (secret) {
      component = (
        <IconButton onClick={handleClickShowPassword} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      );
    }
    return <InputAdornment position="end" children={component} />;
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <Typography
        align="left"
        children={label}
        fontSize={12}
        fontWeight="bold"
        color="black"
      />
      <TextField
        ref={ref}
        value={value}
        fullWidth={fullWidth}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRows}
        onChange={onChange}
        onFocus={onFocus}
        size="small"
        id={id}
        name={name}
        variant="outlined"
        type={showPassword ? "text" : secret ? "password" : type ?? "text"}
        helperText={helperText}
        error={error}
        InputProps={{
          startAdornment,
          endAdornment: endAdornment(),
        }}
        inputProps={{
          maxLength: maxLength,
          minLength: minLength,
        }}
        children={props?.children}
      />
    </FormControl>
  );
}

export default TextOutlineField;
