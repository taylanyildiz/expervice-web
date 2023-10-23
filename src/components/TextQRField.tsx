import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { QRCodeView } from ".";

type InputType =
  | "password"
  | "email"
  | "number"
  | "text"
  | "tel"
  | "url"
  | "date";

/// Text outline field props
interface TextORFieldProps {
  id?: any;
  name?: string;
  label?: string;
  secret?: boolean;
  type?: InputType;
  value?: any;
  helperText?: ReactNode | null;
  error?: boolean;
  fullWidth?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  children?: ReactNode;
  height?: number;
  placeholder?: string;
  radius?: number;
}

function TextORField(props?: TextORFieldProps) {
  let {
    id,
    name,
    value,
    label,
    type,
    helperText,
    error,
    fullWidth,
    maxLength,
    minLength,
    onChange,
    onFocus,
    height,
    placeholder,
    radius,
  } = props ?? {};

  radius ??= 4;

  return (
    <FormControl fullWidth={fullWidth}>
      <Typography
        align="left"
        children={label}
        fontSize={12}
        fontWeight="bold"
        color="black"
      />
      <Grid container>
        <Grid item xs={1.4}>
          <Box
            height={40}
            width={40}
            sx={{
              backgroundColor: "#F2F4F8",
              borderRadius: `${radius}px 0px 0px ${radius}px`,
            }}
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <QRCodeView value={value} size={30} />
          </Box>
        </Grid>
        <Grid item xs={10.6}>
          <TextField
            placeholder={placeholder}
            value={value}
            fullWidth={fullWidth}
            onChange={onChange}
            onFocus={onFocus}
            size="small"
            id={id}
            name={name}
            variant="outlined"
            type={type}
            helperText={null}
            error={error}
            InputProps={{
              sx: {
                height: height,
                borderRadius: `0px ${radius}px ${radius}px 0px`,
              },
            }}
            inputProps={{
              maxLength: maxLength,
              minLength: minLength,
            }}
            children={props?.children}
          />
        </Grid>
      </Grid>
      <FormHelperText error={error} sx={{ p: 0, m: 0 }}>
        {helperText ?? " "}
      </FormHelperText>
    </FormControl>
  );
}

export default TextORField;
