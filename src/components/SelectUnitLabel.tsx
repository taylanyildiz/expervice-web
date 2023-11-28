import UnitLabel from "@Models/units/unit_label";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectUnitLabelProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: UnitLabel;
  onChanged: (values: UnitLabel | null | undefined) => void;
}

function SelectUnitLabel(props: SelectUnitLabelProps) {
  const { onChanged, error, fullWidth, helperText, label, value } = props;

  /// Constant store
  const { unitLabels } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Option-Options
  const [options, setOptions] = useState<UnitLabel[]>([]);
  const [option, setOption] = useState<UnitLabel | null>(null);

  useEffect(() => {
    constantRepo.getUnitLabels();
  }, []);

  useEffect(() => {
    setOptions(unitLabels);
  }, [unitLabels]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  const box = (color?: string) => {
    if (!color) return <></>;
    return (
      <Box
        width={25}
        height={25}
        sx={{ borderRadius: "50%", backgroundColor: color }}
      />
    );
  };

  return (
    <Autocomplete
      loading
      value={option}
      options={options}
      clearIcon={false}
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
              InputProps={Object.assign(props.InputProps, {
                startAdornment: box(option?.hex_code),
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
        const name = option.name;
        return (
          <li {...props} key={option.id} style={{ fontSize: 13 }}>
            <Grid container columnSpacing={1} alignItems="center">
              <Grid item children={box(option.hex_code)} />
              <Grid item children={name} />
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default SelectUnitLabel;
