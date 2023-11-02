import TechnicianUser from "@Models/technician-user/technician_user";
import UnitRepository from "@Repo/unit_repository";
import { RootState } from "@Store/index";
import { caption } from "@Utils/functions";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectAvailableTechniciansProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: TechnicianUser;
  unitId?: number;
  jobSubTypeId?: number;
  selecteds?: (number | undefined | null)[];
  onChanged: (values: TechnicianUser | null | undefined) => void;
}

function SelectAvailableTechnicians(props: SelectAvailableTechniciansProps) {
  const {
    fullWidth,
    error,
    helperText,
    label,
    jobSubTypeId,
    unitId,
    value,
    onChanged,
    selecteds,
  } = props;

  /// Units store
  const { technicians } = useSelector((state: RootState) => state.unit);

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Option-Options state
  const [options, setOptions] = useState<TechnicianUser[]>([]);
  const [option, setOption] = useState<TechnicianUser | null>(null);

  /// Initialize component
  useEffect(() => {
    if (!unitId || !jobSubTypeId) return;
    unitRepo.getAvailableTechnicians(unitId, jobSubTypeId);
  }, []);

  /// When changed [technicians]
  useEffect(() => {
    setOptions(technicians);
  }, [technicians]);

  /// When changed [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  /// Changed handle
  const onChangedHandle = (v: TechnicianUser | null) => {
    onChanged(v);
  };

  /// Selected avataor
  const avatar = (name?: string | null) =>
    name ? (
      <Avatar sx={{ width: 30, height: 30 }}>
        <Typography fontSize={12} children={caption(name)} />
      </Avatar>
    ) : null;

  return (
    <Autocomplete
      fullWidth={fullWidth}
      options={options}
      value={option}
      clearIcon={false}
      onChange={(_, v) => onChangedHandle(v)}
      getOptionLabel={(option) => `${option?.first_name} ${option?.last_name}`}
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
              InputProps={Object.assign(props.InputProps, {
                startAdornment: avatar(
                  option && `${option?.first_name} ${option?.last_name}`
                ),
              })}
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
      renderOption={(props, option) => {
        const displayName = `${option?.first_name} ${option?.last_name}`;
        let values = {};
        if (selecteds?.includes(option.id!)) {
          values = {
            pointerEvents: "none",
            opacity: 0.6,
          };
        }
        return (
          <li {...props} key={option.id} style={{ fontSize: 13, ...values }}>
            <Grid container columnSpacing={1} alignItems="center">
              <Grid item children={avatar(displayName)} />
              <Grid item children={displayName} />
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default SelectAvailableTechnicians;
