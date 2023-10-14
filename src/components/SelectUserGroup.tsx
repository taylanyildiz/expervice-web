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
  const [option, setOption] = useState<CompanyGroup | null | undefined>(null);

  /// Initialize component
  useEffect(() => {
    setOptions(rows);
  }, [groups]);

  useEffect(() => {
    userRepo.getGroups();
  }, []);

  ///
  useEffect(() => {
    setOption(value);
  }, [value]);

  return (
    <Autocomplete
      options={options}
      value={option}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={(_, value) => onChanged(value)}
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
      groupBy={(option) => JSON.stringify(option.region) ?? ""}
      getOptionLabel={(option) => option.name ?? ""}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{JSON.parse(params.group)["name"]}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}

export default SelectUserGroup;
