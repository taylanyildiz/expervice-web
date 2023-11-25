import { CompanyRegion } from "@Models/index";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectRegionProps {
  value?: CompanyRegion | number | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (values: CompanyRegion | null | undefined) => void;
}

function SelectRegions(props: SelectRegionProps) {
  const { value, label, fullWidth, helperText, error, onChanged } = props;

  /// Region Resitory
  const regionRepository = new CompanyRegionRepository();

  /// Region Store
  const {
    regions: { rows },
  } = useSelector((state: RootState) => state.companyRegion);

  ///
  const [options, setOptions] = useState<CompanyRegion[]>([]);
  const [option, setOption] = useState<CompanyRegion | null>(null);

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
    if (typeof value === "number") {
      const index = rows.findIndex((e1) => e1.id === value);
      if (index === -1) return;
      setOption(rows[index]);
      return;
    }
    setOption((value as CompanyRegion | null | undefined) ?? null);
  }, [value]);

  return (
    <Autocomplete
      value={option}
      options={options}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option.name ?? ""}
      onChange={(_, value) => onChanged(value)}
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
