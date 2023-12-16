import { useUser } from "@Features/summary/company/helper/company_helper";
import UnitType from "@Models/units/unit_type";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
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
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

interface SelectUnitTypesProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: number[];
  onChanged: (values: number[] | null | undefined) => void;
}

function SelectUnitTypes(props: SelectUnitTypesProps) {
  const { label, fullWidth, helperText, error, values, onChanged } = props;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant store
  const { unitTypes } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Options and option
  const [options, setOptions] = useState<UnitType[]>([]);
  const [option, setOption] = useState<UnitType[]>([]);

  /// Initialize component
  useEffect(() => {
    constantRepo.getUnitTypes();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    setOptions(unitTypes ?? []);
  }, [unitTypes]);

  /// When cahnged value
  useEffect(() => {
    if (!values || values.length === 0) return setOption([]);
    setOption(unitTypes.filter((e) => values.includes(e.id!)));
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        loading
        multiple
        fullWidth={fullWidth}
        options={options}
        value={option}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        renderTags={(value: readonly UnitType[], getTagProps) =>
          value.map((option: UnitType, index: number) => (
            <Chip
              variant="outlined"
              label={option.translations?.name?.[lng]}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(_, v) => onChanged(v.map((e) => e.id!))}
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

export default SelectUnitTypes;
