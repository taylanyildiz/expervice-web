import { useUser } from "@Features/summary/company/helper/company_helper";
import UnitLabel from "@Models/units/unit_label";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectUnitLabelsProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: number[];
  onChanged: (values: number[] | null | undefined) => void;
}

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

function SelectUnitLabels(props: SelectUnitLabelsProps) {
  const { onChanged, error, fullWidth, helperText, label, values } = props;

  /// Constant store
  const { unitLabels } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Option-Options
  const [options, setOptions] = useState<UnitLabel[]>([]);
  const [option, setOption] = useState<UnitLabel[]>([]);

  useEffect(() => {
    constantRepo.getUnitLabels();
  }, []);

  useEffect(() => {
    setOptions(unitLabels);
  }, [unitLabels]);

  useEffect(() => {
    if (!values || values.length === 0) return setOption([]);
    setOption(unitLabels.filter((e) => values.includes(e.id!)));
  }, [values]);

  const box = (color?: string) => {
    if (!color) return <></>;
    return (
      <Box
        width={25}
        height={25}
        sx={{ borderRadius: "50%", backgroundColor: color }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        loading
        multiple
        value={option}
        options={options}
        clearIcon={false}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        onChange={(_, value) => onChanged(value.map((e) => e.id!))}
        renderTags={(value: readonly UnitLabel[], getTagProps) =>
          value.map((option: UnitLabel, index: number) => (
            <Chip
              avatar={box(option.hex_code)}
              variant="outlined"
              label={option.name}
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
        renderOption={(props, option) => {
          const name = option.name;
          return (
            <li {...props} key={option.id} style={{ fontSize: 13 }}>
              <Grid container columnSpacing={1} alignItems="center">
                <Grid item children={box(option.hex_code)} />
                <Grid item children={name} />
              </Grid>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default SelectUnitLabels;
