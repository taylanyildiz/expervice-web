import UnitSubType from "@Models/units/unit_sub_type";
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

interface SelectUnitSubTypeProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: UnitSubType;
  onChanged: (values: UnitSubType | null | undefined) => void;
}

function SelectUnitSubType(props: SelectUnitSubTypeProps) {
  const { label, fullWidth, helperText, error, value, onChanged } = props;

  /// Constant store
  const { unitSubTypes } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Options and option
  const [options, setOptions] = useState<UnitSubType[]>([]);
  const [option, setOption] = useState<UnitSubType | null>(null);

  /// Initialize component
  useEffect(() => {
    constantRepo.getUnitSubTypes();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    setOptions(unitSubTypes ?? []);
  }, [unitSubTypes]);

  /// When cahnged value
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      loading
      fullWidth={fullWidth}
      options={options}
      value={option}
      groupBy={(option) => option?.unit_type?.name ?? ""}
      getOptionLabel={(option) => option.name ?? ""}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onChange={(_, v) => onChanged(v)}
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

export default SelectUnitSubType;
