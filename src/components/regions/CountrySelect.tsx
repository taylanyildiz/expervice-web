import { Country } from "@Models/index";
import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RegionRepository from "@Repo/region_repository";
import { useSelector } from "react-redux";
import { RootState } from "@Utils/hooks";

/// Country select props
interface CountrySelectProps {
  value?: Country | null;
  onChanged?: (value?: Country | null) => void;
  fullWidth?: boolean;
  label?: string;
  id?: string;
}

function CountrySelect(props: CountrySelectProps) {
  const { value, fullWidth, label, id, onChanged } = props;

  /// Region store
  const { countries } = useSelector((state: RootState) => state.region);

  /// Region repository
  const regionRepo = new RegionRepository();

  /// Selected states
  const [option, setOption] = useState<Country | null>();
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
            <TextField {...props} size="small" />
          </FormControl>
        );
      }}
    />
  );
}

export default CountrySelect;
