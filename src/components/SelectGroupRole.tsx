import GroupRole from "@Models/technician-user/group_role";
import ConstantRepository from "@Repo/constant_repository";
import { RootState } from "@Store/index";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SelectGroupRoleProps {
  value?: GroupRole | null;
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: GroupRole | null) => void;
}

function SelectGroupRole(props: SelectGroupRoleProps) {
  const { value, label, fullWidth, helperText, error, onChanged } = props;

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Constant store
  const { groupRoles } = useSelector((state: RootState) => state.constant);

  ///
  const [options, setOptions] = useState<GroupRole[]>([]);
  const [option, setOption] = useState<GroupRole | null>(null);

  useEffect(() => {
    constantRepo.getGroupRoles();
  }, []);

  useEffect(() => {
    setOptions(groupRoles);
  }, [groupRoles]);

  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      options={options}
      value={option}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={(_, value) => onChanged(value)}
      getOptionLabel={(option) => option.name ?? ""}
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

export default SelectGroupRole;
