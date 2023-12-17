import { useUser } from "@Features/summary/company/helper/company_helper";
import JobSubType from "@Models/job/job_sub_type";
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

interface SelectJobSubTypesProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: JobSubType[] | number[];
  types?: number[];
  clearIcon?: boolean;
  onChanged: (values: JobSubType[] | null | undefined) => void;
  disabled?: boolean;
  disableClearable?: boolean;
}

function SelectJobSubTypes(props: SelectJobSubTypesProps) {
  const {
    label,
    fullWidth,
    helperText,
    error,
    values,
    types,
    clearIcon,
    onChanged,
    disabled,
    disableClearable,
  } = props;

  /// Constant store
  const { jobSubTypes } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Options and option
  const [options, setOptions] = useState<JobSubType[]>([]);
  const [option, setOption] = useState<JobSubType[]>([]);

  /// Initialize component
  useEffect(() => {
    constantRepo.getJobSubTypes();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    let values = [...jobSubTypes];
    if ((types ?? []).length !== 0) {
      values = jobSubTypes.filter((e) => types?.includes(e.type_id!));
      if (option.length !== 0) {
        if (option.some((e) => !types?.includes(e.type_id!))) {
          onChanged([]);
        }
      }
    }
    setOptions(values);
  }, [jobSubTypes, types]);

  /// When cahnged value
  useEffect(() => {
    if (values?.every((e) => typeof e === "number")) {
      return setOption(jobSubTypes.filter((e) => values?.includes(e.id!)));
    }
    setOption((values ?? []) as JobSubType[]);
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        disabled={disabled}
        loading
        fullWidth={fullWidth}
        options={options}
        value={option}
        clearIcon={clearIcon}
        disableClearable={disableClearable}
        groupBy={(option) => option?.type?.translations?.name?.[lng] ?? ""}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        isOptionEqualToValue={(value, option) => value?.id === option?.id}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderTags={(value: readonly JobSubType[], getTagProps) =>
          value.map((option: JobSubType, index: number) => (
            <Chip
              variant="outlined"
              label={option.translations?.name?.[lng]}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(_, v) => {
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
    </ThemeProvider>
  );
}

export default SelectJobSubTypes;
