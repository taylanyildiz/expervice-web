import { useUnit } from "@Features/summary/units/helper/unit_helper";
import Unit from "@Models/units/unit";
import UnitRepository from "@Repo/unit_repository";
import { AppDispatch } from "@Store/index";
import { setUnitFilter } from "@Store/unit_store";
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
import { useDispatch } from "react-redux";

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
}

function SelectUnit(props: SelectUnitProps) {
  const { label, fullWidth, helperText, error, value, onChanged, clearIcon } =
    props;

  /// Constant store
  const {
    layzLoading,
    units: { rows },
  } = useUnit();

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Options and option
  const [options, setOptions] = useState<Unit[]>([]);
  const [option, setOption] = useState<Unit | null>(null);

  /// Initialize component
  useEffect(() => {
    dispatch(setUnitFilter({ has_job: false }));
    unitRepo.getUnits();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    setOptions(rows ?? []);
  }, [rows]);

  /// When cahnged value
  useEffect(() => {
    setOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      loading={layzLoading}
      fullWidth={fullWidth}
      options={options}
      value={option}
      clearIcon={clearIcon}
      groupBy={(option) => option?.group?.name ?? ""}
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
