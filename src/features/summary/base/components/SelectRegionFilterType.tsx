import {
  Autocomplete,
  FormControl,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ERegionFilterType } from "../entities/enums";
import { getRegionFilterTitle } from "../helper/summary_helper";

/// Theme of autocomplate
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          fontSize: 14,
        },
        input: {
          height: 15,
          fontSize: 14,
        },
      },
    },
  },
});

interface SelectRegionFilterTypePrpos {
  label?: string;
  value?: ERegionFilterType | null;
  onChanged: (value: ERegionFilterType | null) => void;
}

function SelectRegionFilterType(props: SelectRegionFilterTypePrpos) {
  const { label, value, onChanged } = props;

  /// Option - Options state
  const [options, setOptions] = useState<ERegionFilterType[]>([]);
  const [option, setOption] = useState<ERegionFilterType | null>(null);

  /// Initialize component
  useEffect(() => {
    let value = Object.values(ERegionFilterType).filter(
      (e) => typeof e === "number"
    ) as number[];
    setOptions(value);
  }, []);

  /// Listen [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  const onChangedHandle = (value: ERegionFilterType | null) => {
    onChanged(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        fullWidth
        clearIcon={null}
        value={option}
        options={options}
        getOptionLabel={(option) => getRegionFilterTitle(option)}
        onChange={(_, v) => onChangedHandle(v)}
        renderInput={(props) => {
          return (
            <FormControl fullWidth>
              <Typography
                display="flex"
                justifyContent="start"
                fontSize={12}
                fontWeight="bold"
                children={label}
              />
              <TextField {...props} helperText={null} size="small" />
            </FormControl>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default SelectRegionFilterType;
