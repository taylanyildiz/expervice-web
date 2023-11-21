import Unit from "@Models/units/unit";
import UnitRepository from "@Repo/unit_repository";
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

interface SelectUnitProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  value?: Unit | null;
  onChanged: (values: Unit | null) => void;
  clearIcon?: boolean;
  disabled?: boolean;
}

function SelectUnit(props: SelectUnitProps) {
  const {
    label,
    fullWidth,
    helperText,
    error,
    value,
    onChanged,
    clearIcon,
    disabled,
  } = props;

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Options and option
  const [options, setOptions] = useState<{
    rows: Unit[];
    count: number;
  }>({ rows: [], count: 0 });
  const [option, setOption] = useState<Unit | null>(null);

  /// Initialize component
  useEffect(() => {
    unitRepo.getJoblessUnits().then((value) => {
      if (!value) return;
      setOptions(value);
    });
  }, []);

  /// When cahnged value
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      disabled={disabled}
      fullWidth={fullWidth}
      options={options.rows}
      value={option}
      clearIcon={clearIcon}
      groupBy={(option) => `${option?.group?.name}`}
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

export default SelectUnit;
