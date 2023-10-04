import { State } from "@Models/index";
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
import { setStates } from "@Store/region_store";

/// State select props
interface StateSelectProps {
  id?: string;
  label?: string;
  countryId?: number;
  value?: State | null;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged?: (value?: State | null) => void;
}

function StateSelect(props: StateSelectProps) {
  const {
    value,
    countryId,
    fullWidth,
    label,
    id,
    helperText,
    error,
    onChanged,
  } = props;

  /// Region store
  const { states } = useSelector((state: RootState) => state.region);

  /// Dispatch
  const dispatch = useDispatch();

  /// Region repository
  const regionRepo = new RegionRepository();

  /// Selected states
  const [option, setOption] = useState<State | null | undefined>(null);
  const [options, setOptions] = useState<State[]>([]);

  /// Get states
  const getStates = async () => {
    if (!countryId) {
      setOptions([]);
      setOption(null);
      onChanged?.(null);
      dispatch(setStates([]));
      return;
    }
    await regionRepo.getStates(countryId);
    if (value?.country_id === countryId) {
      onChanged?.(value);
      return;
    }
    onChanged?.(null);
  };

  /// Initialize component
  /// Listen [value] - [states]
  useEffect(() => {
    setOptions(states);
    setOption(value);
  }, [value, states]);

  /// Initialize component
  /// Listen [countryId]
  useEffect(() => {
    getStates();
  }, [countryId]);

  /// Changed handle
  const onChangeHandle = (
    _?: React.SyntheticEvent<Element, Event>,
    value?: State | null
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
              helperText={helperText ?? " "}
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
