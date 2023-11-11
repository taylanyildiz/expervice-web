import { useForm } from "@Features/summary/forms/helper/form_helper";
import Form from "@Models/form/form";
import FormRepository from "@Repo/form_repository";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface SelectFormProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: Form;
  onChanged: (values: Form | null | undefined) => void;
}

function SelectForm(props: SelectFormProps) {
  const { label, fullWidth, helperText, error, value, onChanged } = props;

  /// Customer store
  const {
    forms: { rows, count },
  } = useForm();

  /// Form repository
  const formRepo = new FormRepository();

  const [options, setOptions] = useState<Form[]>([]);
  const [option, setOption] = useState<Form | null>(null);

  useEffect(() => {
    formRepo.getForms();
  }, []);

  useEffect(() => {
    setOptions(rows);
  }, [rows, count]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      value={option}
      options={options}
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

export default SelectForm;
