import { useUser } from "@Features/summary/company/helper/company_helper";
import UserRole from "@Models/user_role";
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

interface SelectUserRolesProps {
  roleType?: number;
  values?: UserRole[] | number[] | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: UserRole[] | null | undefined) => void;
}

function SelectUserRoles(props: SelectUserRolesProps) {
  const { roleType, values, fullWidth, helperText, error, label, onChanged } =
    props;
  /// Constant store
  const { userRoles } = useSelector((state: RootState) => state.constant);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant repo
  const constantRepo = new ConstantRepository();

  ///
  const [options, setOptions] = useState<UserRole[]>([]);
  const [option, setOption] = useState<UserRole[]>([]);

  /// Get user role types
  useEffect(() => {
    constantRepo.getUserRoles(roleType);
  }, [roleType]);

  /// Initialize value
  useEffect(() => {
    if (values?.every((item) => typeof item === "number")) {
      const roles = options.filter((e) => values?.includes(e.id!));
      setOption(roles);
      return;
    }
    setOption((values ?? []) as UserRole[]);
  }, [values, options]);

  /// Set options
  useEffect(() => {
    if (!userRoles) return;
    setOptions(userRoles);
  }, [userRoles]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        multiple
        value={option!}
        fullWidth={fullWidth}
        options={options}
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
        groupBy={(option) =>
          option.role_type?.translations?.role_type?.[lng] ?? ""
        }
        getOptionLabel={(option) => option.translations?.role?.[lng] ?? ""}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(_, value) => onChanged(value)}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderTags={(value: readonly UserRole[], getTagProps) =>
          value.map((option: UserRole, index: number) => (
            <Chip
              {...getTagProps({ index })}
              variant="outlined"
              label={option.translations?.role?.[lng]}
            />
          ))
        }
      />
    </ThemeProvider>
  );
}

export default SelectUserRoles;
