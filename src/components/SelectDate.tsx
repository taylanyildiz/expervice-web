import { ECustomDate } from "@Models/enums";
import { getCustomDate, getCustomDateTile } from "@Utils/functions";
import {
  Autocomplete,
  FormControl,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

interface SelectDateProps {
  label?: string;
  value?: ECustomDate | null;
  onChanged: (
    value: ECustomDate | null,
    start: Date | null,
    end: Date | null
  ) => void;
}

/**
 * Select [ECustomDate] without [CustomDate]
 * @param props
 * @returns
 */
function SelectDate(props: SelectDateProps) {
  const { label, value, onChanged } = props;

  const [options, setOptions] = useState<ECustomDate[]>([]);
  const [option, setOption] = useState<ECustomDate | null>(null);

  /// Initialize component
  useEffect(() => {
    let value = Object.values(ECustomDate).filter(
      (e) => typeof e === "number"
    ) as number[];
    value = value.filter((e) => e !== 2);
    setOptions(value);
  }, []);

  /// Listen [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  const onChangedHandle = (value: ECustomDate | null) => {
    const { start, end } = getCustomDate(value);
    onChanged(value, start, end);
  };

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          listbox: {
            fontSize: 12,
          },
          input: {
            height: 10,
            fontSize: 12,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        fullWidth
        clearIcon={null}
        value={option}
        options={options}
        getOptionLabel={(option) => getCustomDateTile(option)}
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

export default SelectDate;
