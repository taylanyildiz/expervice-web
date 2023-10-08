import { Country } from "@Models/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import RegionRepository from "@Repo/region_repository";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";

/// Country select props
interface CountrySelectProps {
  id?: string;
  label?: string;
  value?: Country | null;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged?: (value?: Country | null) => void;
}

function CountrySelect(props: CountrySelectProps) {
  const { value, fullWidth, label, id, helperText, error, onChanged } = props;

  /// Region store
  const { countries } = useSelector((state: RootState) => state.region);

  /// Region repository
  const regionRepo = new RegionRepository();

  /// Selected states
  const [option, setOption] = useState<Country | null | undefined>(null);
  const [options, setOptions] = useState<Country[]>([]);

  /// Get countries
  const getCountries = async () => {
    await regionRepo.getCountires();
    setOptions(countries);
  };

  /// Initialize component
  useEffect(() => {
    setOption(value);
  }, [value]);

  /// Initialize component
  useEffect(() => {
    getCountries();
  }, []);

  /// Changed handle
  const onChangeHandle = (
    _?: React.SyntheticEvent<Element, Event>,
    value?: Country | null
  ) => {
    onChanged?.(value);
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      id={id}
      value={option}
      options={options}
      loading
      onChange={onChangeHandle}
      getOptionLabel={(option) => option.name ?? ""}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
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

export default CountrySelect;
