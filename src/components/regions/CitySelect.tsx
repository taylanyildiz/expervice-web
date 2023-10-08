import { City } from "@Models/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import RegionRepository from "@Repo/region_repository";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/index";
import { setCities } from "@Store/region_store";

/// City select props
interface CitySelectProps {
  id?: string;
  label?: string;
  stateId?: number;
  value?: City | null;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged?: (value?: City | null) => void;
}

function StateSelect(props: CitySelectProps) {
  const { value, stateId, fullWidth, label, id, helperText, error, onChanged } =
    props;

  /// Dispatch
  const dispatch = useDispatch();

  /// Region store
  const { cities } = useSelector((state: RootState) => state.region);

  /// Region repository
  const regionRepo = new RegionRepository();

  /// Selected states
  const [option, setOption] = useState<City | null | undefined>(null);
  const [options, setOptions] = useState<City[]>([]);

  /// Get cities
  useEffect(() => {
    if (!stateId) {
      dispatch(setCities(null));
      onChangeHandle(null);
      return;
    }
    if (option && stateId !== option?.state_id) {
      onChangeHandle(null);
    }
    regionRepo.getCities(stateId);
  }, [stateId]);

  /// Initialize cities
  useEffect(() => {
    setOptions(cities);
  }, [cities]);

  /// Initialize selected
  useEffect(() => {
    setOption(value);
  }, [value]);

  /// Destroy
  useEffect(() => {
    return () => {
      dispatch(setCities(null));
    };
  }, []);

  /// Changed handle
  const onChangeHandle = (value?: City | null) => {
    onChanged?.(value);
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      id={id}
      value={option}
      options={options}
      loading
      onChange={(_, v) => onChangeHandle(v)}
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

export default StateSelect;
