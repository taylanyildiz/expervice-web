import { useUser } from "@Features/summary/company/helper/company_helper";
import JobPriority from "@Models/job/job_priority";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          height: "auto",
          fontSize: 13,
          borderRadius: 3,
          padding: 0,
          margin: 1,
        },
        listbox: {
          fontSize: 14,
        },
        input: {
          fontSize: 14,
          height: 15,
        },
      },
    },
  },
});

interface SelectJobPrioritiesProps {
  disabled?: boolean;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: JobPriority[] | number[];
  onChanged: (values: JobPriority[] | null | undefined) => void;
}

function SelectJobPriorities(props: SelectJobPrioritiesProps) {
  const { disabled, fullWidth, error, helperText, label, values, onChanged } =
    props;

  /// Constants store
  const { jobPriorities } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Option-Options state
  const [options, setOptions] = useState<JobPriority[]>([]);
  const [option, setOption] = useState<JobPriority[]>([]);

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
    if (values?.every((e) => typeof e === "number")) {
      return setOption(jobPriorities.filter((e) => values.includes(e.id!)));
    }
    setOption((values ?? []) as JobPriority[]);
  }, [values]);

  /// Changed handle
  const onChangedHandle = (v: JobPriority[] | null) => {
    onChanged(v);
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        disabled={disabled}
        fullWidth={fullWidth}
        options={options}
        value={option}
        clearIcon={false}
        getOptionLabel={(e) => e.translations?.name?.[lng] ?? ""}
        isOptionEqualToValue={(value, option) => value?.id === option?.id}
        onChange={(_, v) => {
          if (!v) return;
          onChangedHandle(v);
        }}
        renderTags={(value: readonly JobPriority[], getTagProps) =>
          value.map((option: JobPriority, index: number) => (
            <Chip
              variant="outlined"
              label={option.translations?.name?.[lng]}
              {...getTagProps({ index })}
            />
          ))
        }
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
    </ThemeProvider>
  );
}

export default SelectJobPriorities;
