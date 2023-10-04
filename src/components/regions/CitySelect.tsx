import { City } from "@Models/index";
import {
  Autocomplete,
  FormControl,
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
  const getCities = async () => {
    if (!stateId) {
      setOptions([]);
      setOption(null);
      onChanged?.(null);
      dispatch(setCities([]));
      return;
    }
    await regionRepo.getCities(stateId);

    if (value?.state_id === stateId) {
      onChanged?.(value);
      return;
    }
    onChanged?.(null);
  };

  /// Initialize component
  /// Listen [value] - [cities]
  useEffect(() => {
    setOptions(cities);
    setOption(value);
  }, [value, cities]);

  /// Listen when changed [stateId]
  useEffect(() => {
    getCities();
  }, [stateId]);

  /// Changed handle
  const onChangeHandle = (
    _?: React.SyntheticEvent<Element, Event>,
    value?: City | null
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
              helperText={helperText}
              error={error}
              size="small"
            />
          </FormControl>
        );
      }}
    />
  );
}

export default StateSelect;
