import { ReactNode, useEffect, useState } from "react";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { EInternalUserStatus } from "../entities/internal_user_enums";
import { getInternalStatusTitle } from "../helper/internal_user_enum_helper";

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          height: "auto",
          fontSize: 13,
          borderRadius: 3,
          padding: 0,
          margin: 1,
        },
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

interface SelectInternalStatusesProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: EInternalUserStatus[];
  onChanged?: (values?: EInternalUserStatus[] | null) => void;
}

function SelectInternalStatuses(props: SelectInternalStatusesProps) {
  const { disabled, fullWidth, error, helperText, label, values, onChanged } =
    props;

  /// Option-Options state
  const [options, setOptions] = useState<EInternalUserStatus[]>([]);
  const [option, setOption] = useState<EInternalUserStatus[]>([]);

  /// Changed handle
  const onChangedHandle = (v: EInternalUserStatus[] | null) => {
    onChanged?.(v);
  };

  /// Initialize component
  useEffect(() => {
    const value = Object.values(EInternalUserStatus).filter(
      (e) => typeof e === "number"
    ) as number[];
    setOptions(value);
  }, []);

  /// Listen [value]
  useEffect(() => {
    setOption(values ?? []);
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        value={option}
        getOptionLabel={(e) => getInternalStatusTitle(e)}
        isOptionEqualToValue={(value, option) => value === option}
        onChange={(_, v) => onChangedHandle(v)}
        renderTags={(value: readonly EInternalUserStatus[], getTagProps) =>
          value.map((option: EInternalUserStatus, index: number) => (
            <Chip
              variant="outlined"
              label={getInternalStatusTitle(option)}
              {...getTagProps({ index })}
            />
          ))
        }
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

export default SelectInternalStatuses;
