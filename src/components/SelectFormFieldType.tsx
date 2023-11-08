import FieldType from "@Models/form/field_type";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface SelectFormFieldTypeProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: FieldType;
  onChanged: (values: FieldType | null | undefined) => void;
}

function SelectFormFieldType(props: SelectFormFieldTypeProps) {
  const { label, fullWidth, helperText, error, value, onChanged } = props;

  /// Constant store
  const { fieldTypes } = useSelector((state: RootState) => state.constant);
  const loading: boolean = useMemo(
    () => fieldTypes?.length === 0,
    [fieldTypes]
  );

  /// Constant repository
  const constantRepo = new ConstantRepository();

  const [options, setOptions] = useState<FieldType[]>([]);
  const [option, setOption] = useState<FieldType | null>(null);

  useEffect(() => {
    constantRepo.getFieldTypes();
  }, []);

  useEffect(() => {
    setOptions(fieldTypes);
  }, [fieldTypes]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      loading={loading}
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

export default SelectFormFieldType;
