import { CompanyRegion } from "@Models/index";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectRegionProps {
  values?: CompanyRegion[] | null;
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
    regions: { rows, count },
  } = useSelector((state: RootState) => state.compay_region);

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
    setOption(values ?? []);
  }, [values]);

  return (
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
  );
}

export default SelectRegions;
