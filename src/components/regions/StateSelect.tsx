import { State } from "@Models/index";
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
  useEffect(() => {
    if (!countryId) {
      dispatch(setStates([]));
      onChangeHandle(null);
      return;
    }
    if (option && countryId !== option?.country_id) {
      onChangeHandle(null);
    }
    regionRepo.getStates(countryId);
  }, [countryId]);

  /// Initialize states
  useEffect(() => {
    setOptions(states);
  }, [states]);

  /// Initialize selected
  useEffect(() => {
    setOption(value);
  }, [value]);

  /// Destroy
  useEffect(() => {
    return () => {
      dispatch(setStates(null));
    };
  }, []);

  /// Changed handle
  const onChangeHandle = (value?: State | null) => {
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
