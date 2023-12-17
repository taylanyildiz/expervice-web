import { useUser } from "@Features/summary/company/helper/company_helper";
import JobStatus from "@Models/job/job_status";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import Colors from "@Themes/colors";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
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

interface SelectJobStatusesProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: JobStatus[] | number[];
  jobTypes?: number[];
  onChanged: (values: JobStatus[] | null | undefined) => void;
}

function SelectJobStatuses(props: SelectJobStatusesProps) {
  const { label, fullWidth, helperText, error, values, onChanged, jobTypes } =
    props;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Connstant store
  const { jobStatuses } = useSelector((state: RootState) => state.constant);

  /// Job statuses & loading state
  const [options, setOptions] = useState<JobStatus[]>([]);
  const loading = Boolean(options.length === 0);

  /// Option state
  const [option, setOption] = useState<JobStatus[]>([]);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  useEffect(() => {
    constantRepo.getJobStatuses();
  }, []);

  /// Initialize component
  useEffect(() => {
    let values = [...jobStatuses];
    if ((jobTypes ?? []).length !== 0) {
      values = jobStatuses.filter((e) => jobTypes?.includes(e.type_id!));
      if (option.length !== 0) {
        if (option.some((e) => !jobTypes?.includes(e.type_id!))) {
          onChanged([]);
        }
      }
    }
    setOptions(values);
  }, [jobStatuses, jobTypes]);

  /// Depends on [value]
  useEffect(() => {
    if (values?.every((e) => typeof e === "number")) {
      return setOption(jobStatuses.filter((e) => values.includes(e.id!)));
    }
    setOption((values ?? []) as JobStatus[]);
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
        groupBy={(option) => option?.job_type?.translations?.name?.[lng] ?? ""}
        onChange={(_, v) => onChanged(v)}
        isOptionEqualToValue={(value, option) => value?.id === option?.id}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderTags={(value: readonly JobStatus[], getTagProps) =>
          value.map((option: JobStatus, index: number) => (
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

export default SelectJobStatuses;
