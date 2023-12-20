import { useUser } from "@Features/summary/company/helper/company_helper";
import UserRole from "@Models/user_role";
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

interface SelectUserRoleProps {
  roleType?: number;
  value?: UserRole | number | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: UserRole | null | undefined) => void;
}

function SelectUserRole(props: SelectUserRoleProps) {
  const { roleType, value, fullWidth, helperText, error, label, onChanged } =
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
  const [option, setOption] = useState<UserRole | null | undefined>(null);

  /// Get user role types
  useEffect(() => {
    constantRepo.getUserRoles(roleType);
  }, [roleType]);

  /// Initialize value
  useEffect(() => {
    if (typeof value === "number") {
      const role = options.find((e) => e.id === value);
      setOption(role);
      if (role) onChanged(role);
      return;
    }
    setOption(value);
  }, [value, options]);

  /// Set options
  useEffect(() => {
    if (!userRoles) return;
    setOptions(userRoles);
  }, [userRoles]);

  return (
    <Autocomplete
      disableClearable
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
    />
  );
}

export default SelectUserRole;
