import { useUser } from "@Features/summary/company/helper/company_helper";
import JobRole from "@Models/job/job_role";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectJobRoleProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: JobRole | number;
  onChanged: (values: JobRole | null | undefined) => void;
}

function SelectJobRole(props: SelectJobRoleProps) {
  const { disabled, fullWidth, error, helperText, label, value, onChanged } =
    props;

  /// Constants store
  const { jobRoles } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Option-Options state
  const [options, setOptions] = useState<JobRole[]>([]);
  const [option, setOption] = useState<JobRole | null>(null);

  /// Initialize component
  useEffect(() => {
    constantRepo.getJobRoles();
  }, []);

  /// When changed [jobRoles]
  useEffect(() => {
    setOptions(jobRoles);
  }, [jobRoles]);

  /// When changed [value]
  useEffect(() => {
    if (typeof value === "number") {
      const index = jobRoles.findIndex((e) => e.id === value);
      if (index == -1) return setOption(null);
      return setOption(jobRoles[index]);
    }
    setOption(value ?? null);
  }, [value]);

  /// Changed handle
  const onChangedHandle = (v: JobRole | null) => {
    onChanged(v);
  };

  return (
    <Autocomplete
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      value={option}
      getOptionLabel={(e) => e.translations?.name?.[lng] ?? ""}
      isOptionEqualToValue={(value, option) => value?.id === option?.id}
      onChange={(_, v) => onChangedHandle(v)}
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

export default SelectJobRole;
