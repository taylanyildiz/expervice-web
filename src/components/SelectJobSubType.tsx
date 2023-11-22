import JobSubType from "@Models/job/job_sub_type";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import Colors from "@Themes/colors";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: Colors.pageBackground,
}));

const GroupItems = styled("ul")({
  fontSize: 11,
  padding: 0,
});

interface SelectJobSubTypeProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: JobSubType | number;
  clearIcon?: boolean;
  onChanged: (values: JobSubType | null | undefined) => void;
  disabled?: boolean;
}

function SelectJobSubType(props: SelectJobSubTypeProps) {
  const {
    label,
    fullWidth,
    helperText,
    error,
    value,
    clearIcon,
    onChanged,
    disabled,
  } = props;

  /// Constant store
  const { jobSubTypes } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Options and option
  const [options, setOptions] = useState<JobSubType[]>([]);
  const [option, setOption] = useState<JobSubType | null>(null);

  /// Initialize component
  useEffect(() => {
    constantRepo.getJobSubTypes();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    setOptions(jobSubTypes ?? []);
  }, [jobSubTypes]);

  /// When cahnged value
  useEffect(() => {
    if (!value) return setOption(null);
    if (typeof value === "number") {
      const find = jobSubTypes.find((e) => e.id === value);
      setOption(find ?? null);
      return;
    }
    setOption(value);
  }, [value]);

  return (
    <Autocomplete
      disabled={disabled}
      loading
      fullWidth={fullWidth}
      options={options}
      value={option}
      clearIcon={clearIcon}
      groupBy={(option) => option?.type?.name ?? ""}
      getOptionLabel={(option) => option.name ?? ""}
      isOptionEqualToValue={(value, option) => value?.id === option?.id}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onChange={(_, v) => {
        if (!v) return;
        onChanged(v);
      }}
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

export default SelectJobSubType;
