import { CompanyRegion } from "@Models/index";
import CompanyRegionRepository from "@Repo/company_region_repository";
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

interface SelectRegionProps {
  values?: CompanyRegion[] | number[] | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (values: CompanyRegion[] | null | undefined) => void;
}

function SelectRegions(props: SelectRegionProps) {
  const { values, label, fullWidth, helperText, error, onChanged } = props;

  /// Region Resitory
  const regionRepository = new CompanyRegionRepository();

  /// Region Store
  const {
    regions: { rows },
  } = useSelector((state: RootState) => state.companyRegion);

  ///
  const [options, setOptions] = useState<CompanyRegion[]>([]);
  const [option, setOption] = useState<CompanyRegion[]>([]);

  /// Initialize component
  useEffect(() => {
    regionRepository.getRegions();
  }, []);

  /// Initialize options
  useEffect(() => {
    setOptions(rows);
  }, [rows]);

  /// Initialize value
  useEffect(() => {
    const isNumber = values?.some((e) => typeof e === "number");
    if (isNumber) {
      const finder = rows.filter((e1) => values?.some((e2) => e1.id === e2));
      setOption(finder);
      return;
    }
    setOption((values ?? []) as CompanyRegion[]);
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        value={option}
        options={options}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        getOptionLabel={(option) => option.name ?? ""}
        onChange={(_, value) => onChanged(value)}
        renderTags={(value: readonly CompanyRegion[], getTagProps) =>
          value.map((option: CompanyRegion, index: number) => (
            <Chip
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
      />
    </ThemeProvider>
  );
}

export default SelectRegions;
