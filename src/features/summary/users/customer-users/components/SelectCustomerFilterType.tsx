import { ECustomerFilterType } from "@Models/customer/customer_enums";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { getCustomerFilterTitle } from "../helpers/customer_enum_helper";

interface SelectCustomerFilterTypeProps {
  label?: string;
  helperText?: ReactNode;
  error?: boolean;
  value?: ECustomerFilterType | null;
  onChanged: (type: ECustomerFilterType | null) => void;
}

function SelectCustomerFilterType(props: SelectCustomerFilterTypeProps) {
  const { label, helperText, error, value, onChanged } = props;

  const [options, setOptions] = useState<ECustomerFilterType[]>([]);
  const [option, setOption] = useState<ECustomerFilterType | null>(null);

  /// Initialize component
  useEffect(() => {
    const value = Object.values(ECustomerFilterType).filter(
      (e) => typeof e === "number"
    ) as number[];
    setOptions(value);
  }, []);

  /// Listen [value]
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  const onChangedHandle = (value: ECustomerFilterType | null) => {
    onChanged(value);
  };

  return (
    <Autocomplete
      fullWidth
      options={options}
      value={option}
      clearIcon={null}
      getOptionLabel={(e) => getCustomerFilterTitle(e)}
      isOptionEqualToValue={(value, option) => value === option}
      onChange={(_, v) => onChangedHandle(v)}
      renderInput={(props) => {
        return (
          <FormControl fullWidth>
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

export default SelectCustomerFilterType;
