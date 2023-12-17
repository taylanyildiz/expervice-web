import { useUser } from "@Features/summary/company/helper/company_helper";
import JobType from "@Models/job/job_type";
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

interface SelectJobTypesProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: JobType[] | number[];
  onChanged: (values: JobType[] | null | undefined) => void;
}

function SelectJobTypes(props: SelectJobTypesProps) {
  const { label, fullWidth, helperText, error, values, onChanged } = props;

  /// Constant store
  const { jobTypes } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Options state
  const [options, setOptions] = useState<JobType[]>([]);
  const loading = Boolean(options?.length === 0);

  /// Option state
  const [option, setOption] = useState<JobType[]>([]);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Initialize component
  useEffect(() => {
    constantRepo.getJobTypes();
  }, []);

  useEffect(() => {
    setOptions(jobTypes);
  }, [jobTypes]);

  /// Depends on [value]
  useEffect(() => {
    if (values?.every((e) => typeof e === "number")) {
      return setOption(jobTypes.filter((e) => values.includes(e.id!)));
    }
    setOption((values ?? []) as JobType[]);
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        loading={loading}
        fullWidth={fullWidth}
        options={options}
        value={option}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        onChange={(_, v) => onChanged(v)}
        isOptionEqualToValue={(value, option) => value?.id === option?.id}
        renderTags={(value: readonly JobType[], getTagProps) =>
          value.map((option: JobType, index: number) => (
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

export default SelectJobTypes;
