import { CompanyGroup } from "@Models/index";
import UserRepository from "@Repo/user_repository";
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

interface SelectUserGroupProps {
  value?: CompanyGroup | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: CompanyGroup | null | undefined) => void;
}

function SelectUserGroup(props: SelectUserGroupProps) {
  const { value, label, fullWidth, helperText, error, onChanged } = props;

  /// User store
  const { groups } = useSelector((state: RootState) => state.user);
  const rows = groups.rows;

  /// User repository
  const userRepo = new UserRepository();

  /// Option - Options state
  const [options, setOptions] = useState<CompanyGroup[]>([]);
  const [option, setOption] = useState<CompanyGroup | null>(null);

  /// Initialize component
  useEffect(() => {
    userRepo.getGroups();
  }, []);

  /// When changed [groups]
  useEffect(() => {
    setOptions(rows);
  }, [groups]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      loading
      fullWidth={fullWidth}
      options={options}
      value={option}
      groupBy={(option) => option?.region?.name ?? ""}
      getOptionLabel={(option) => option?.name ?? ""}
      isOptionEqualToValue={(value, option) => value?.id === option?.id}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
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
  );
}

export default SelectUserGroup;
