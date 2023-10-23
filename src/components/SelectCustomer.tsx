import { useCustomer } from "@Features/summary/users/customer-users/helpers/customer_user_helper";
import Customer from "@Models/customer/customer";
import CustomerUserRepository from "@Repo/customer_user_repository";
import { setCustomerFilter } from "@Store/customer_user_store";
import { AppDispatch } from "@Store/index";
import { caption } from "@Utils/functions";
import {
  Autocomplete,
  Avatar,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface SelectCustomerProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: Customer;
  onChanged: (values: Customer | null | undefined) => void;
}

function SelectCustomer(props: SelectCustomerProps) {
  const { label, fullWidth, helperText, error, value, onChanged } = props;

  /// Customer store
  const {
    layzLoading,
    customers: { rows, count },
  } = useCustomer();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Customer repository
  const customerRepo = new CustomerUserRepository();

  const [options, setOptions] = useState<Customer[]>([]);
  const [option, setOption] = useState<Customer | null>(null);

  useEffect(() => {
    dispatch(setCustomerFilter(null));
    customerRepo.getCustomers();
  }, []);

  useEffect(() => {
    setOptions(rows);
  }, [rows, count]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  /// Selected avataor
  const avatar = (name?: string) =>
    name ? (
      <Avatar sx={{ width: 30, height: 30 }}>
        <Typography fontSize={12} children={caption(name)} />
      </Avatar>
    ) : null;

  return (
    <Autocomplete
      loading={layzLoading}
      value={option}
      options={options}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option.display_name ?? ""}
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
                startAdornment: avatar(option?.display_name),
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
        const displayName = option.display_name;
        return (
          <li {...props} key={option.id} style={{ fontSize: 13 }}>
            <Grid container columnSpacing={1}>
              <Grid item children={avatar(displayName)} />
              <Grid item children={displayName} />
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default SelectCustomer;
