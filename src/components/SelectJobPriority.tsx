import JobPriority from "@Models/job/job_priority";
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

interface SelectJobPriorityProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: JobPriority | number;
  onChanged: (values: JobPriority | null | undefined) => void;
}

function SelectJobPriority(props: SelectJobPriorityProps) {
  const { disabled, fullWidth, error, helperText, label, value, onChanged } =
    props;

  /// Constants store
  const { jobPriorities } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Option-Options state
  const [options, setOptions] = useState<JobPriority[]>([]);
  const [option, setOption] = useState<JobPriority | null>(null);

  /// Initialize component
  useEffect(() => {
    constantRepo.getJobPriorities();
  }, []);

  /// When changed [jobRoles]
  useEffect(() => {
    setOptions(jobPriorities);
  }, [jobPriorities]);

  /// When changed [value]
  useEffect(() => {
    if (typeof value === "number") {
      const index = jobPriorities.findIndex((e) => e.id === value);
      if (index == -1) return setOption(null);
      return setOption(jobPriorities[index]);
    }
    setOption(value ?? null);
  }, [value]);

  /// Changed handle
  const onChangedHandle = (v: JobPriority | null) => {
    onChanged(v);
  };

  return (
    <Autocomplete
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      value={option}
      clearIcon={false}
      getOptionLabel={(e) => e.name ?? ""}
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

export default SelectJobPriority;
