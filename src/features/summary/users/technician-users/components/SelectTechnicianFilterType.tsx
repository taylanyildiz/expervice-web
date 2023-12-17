import { ReactNode, useEffect, useState } from "react";
import { ETechnicianFilterType } from "../entities/technician_enums";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { getTechnicianFilterTypeTitle } from "../helper/technician_enum_helper";

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          fontSize: 14,
        },
        input: {
          fontSize: 14,
          height: 15,
        },
      },
    },
  },
});

interface SelectTechnicianFilterTypeProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: ETechnicianFilterType;
  onChanged?: (values?: ETechnicianFilterType | null) => void;
}

function SelectTechnicianFilterType(props: SelectTechnicianFilterTypeProps) {
  const { disabled, fullWidth, error, helperText, label, value, onChanged } =
    props;

  /// Option-Options state
  const [options, setOptions] = useState<ETechnicianFilterType[]>([]);
  const [option, setOption] = useState<ETechnicianFilterType | null>(null);

  /// Changed handle
  const onChangedHandle = (v: ETechnicianFilterType | null) => {
    onChanged?.(v);
  };

  /// Initialize component
  useEffect(() => {
    const value = Object.values(ETechnicianFilterType).filter(
      (e) => typeof e === "number"
    ) as number[];
    setOptions(value);
  }, []);

  /// Listen [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        value={option}
        getOptionLabel={(e) => getTechnicianFilterTypeTitle(e)}
        isOptionEqualToValue={(value, option) => value === option}
        onChange={(_, v) => onChangedHandle(v)}
        renderInput={(props) => {
          return (
            <FormControl fullWidth={fullWidth}>
              <Typography
                display="flex"
                justifyContent="start"
                fontSize={12}
                fontWeight="bold"
                children={label}
              />
              <TextField
                {...props}
                helperText={null}
                error={error}
                size="small"
              />
              <FormHelperText
                error={error}
                sx={{ p: 0, m: 0 }}
                id="my-helper-text"
              >
                {helperText ?? " "}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default SelectTechnicianFilterType;
