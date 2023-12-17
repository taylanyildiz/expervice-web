import { ReactNode, useEffect, useState } from "react";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { EJobFilterType } from "@Features/summary/jobs/entities/job_enums";
import { getJobFilterTypeTitle } from "@Features/summary/jobs/helper/job_enum_helper";

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

interface SelectJobFilterTypeProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: EJobFilterType;
  onChanged?: (values?: EJobFilterType | null) => void;
}

function SelectJobFilterType(props: SelectJobFilterTypeProps) {
  const { disabled, fullWidth, error, helperText, label, value, onChanged } =
    props;

  /// Option-Options state
  const [options, setOptions] = useState<EJobFilterType[]>([]);
  const [option, setOption] = useState<EJobFilterType | null>(null);

  /// Changed handle
  const onChangedHandle = (v: EJobFilterType | null) => {
    onChanged?.(v);
  };

  /// Initialize component
  useEffect(() => {
    const value = Object.values(EJobFilterType).filter(
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
        getOptionLabel={(e) => getJobFilterTypeTitle(e)}
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

export default SelectJobFilterType;
