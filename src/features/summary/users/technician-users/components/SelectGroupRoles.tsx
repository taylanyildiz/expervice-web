import { useUser } from "@Features/summary/company/helper/company_helper";
import GroupRole from "@Models/technician-user/group_role";
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
          fontSize: 13,
          borderRadius: 3,
          padding: 0,
          margin: 1,
          height: "auto",
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

interface SelectGroupRolesProps {
  values?: GroupRole[] | number[] | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: GroupRole[] | null) => void;
}

function SelectGroupRoles(props: SelectGroupRolesProps) {
  const { values, label, fullWidth, helperText, error, onChanged } = props;

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Constant store
  const { groupRoles } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Option - Options state
  const [options, setOptions] = useState<GroupRole[]>([]);
  const [option, setOption] = useState<GroupRole[]>([]);

  useEffect(() => {
    constantRepo.getGroupRoles();
  }, []);

  useEffect(() => {
    setOptions(groupRoles);
  }, [groupRoles]);

  useEffect(() => {
    if (!values || values.length === 0) setOption([]);
    if (values?.every((item) => typeof item === "number")) {
      return setOption(groupRoles.filter((e) => values.includes(e.id!)));
    }
    setOption((values ?? []) as GroupRole[]);
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        options={options}
        value={option}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(_, value) => onChanged(value)}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        renderTags={(value: readonly GroupRole[], getTagProps) =>
          value.map((option: GroupRole, index: number) => (
            <Chip
              {...getTagProps({ index })}
              variant="outlined"
              label={option.translations?.name?.[lng]}
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

export default SelectGroupRoles;
