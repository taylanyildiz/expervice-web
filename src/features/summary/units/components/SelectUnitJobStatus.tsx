import { ReactNode, useEffect, useState } from "react";
import { EUnitJobStatuses } from "../entities/unit_enums";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { getUnitJobStatusTitle } from "../helper/unit_enum_helper";

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

interface SelectUnitJobStatusProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: EUnitJobStatuses;
  onChanged?: (values?: EUnitJobStatuses | null) => void;
}

function SelectUnitJobStatus(props: SelectUnitJobStatusProps) {
  const { disabled, fullWidth, error, helperText, label, value, onChanged } =
    props;

  /// Option-Options state
  const [options, setOptions] = useState<EUnitJobStatuses[]>([]);
  const [option, setOption] = useState<EUnitJobStatuses | null>(null);

  /// Changed handle
  const onChangedHandle = (v: EUnitJobStatuses | null) => {
    onChanged?.(v);
  };

  /// Initialize component
  useEffect(() => {
    const value = Object.values(EUnitJobStatuses).filter(
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
        getOptionLabel={(e) => getUnitJobStatusTitle(e)}
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

export default SelectUnitJobStatus;
