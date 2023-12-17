import { useUser } from "@Features/summary/company/helper/company_helper";
import UnitSubType from "@Models/units/unit_sub_type";
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

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: Colors.pageBackground,
}));

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

const GroupItems = styled("ul")({
  fontSize: 11,
  padding: 0,
});

interface SelectUnitSubTypesProps {
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  values?: number[];
  unitTypes?: number[];
  onChanged: (values: number[] | null | undefined) => void;
}

function SelectUnitSubTypes(props: SelectUnitSubTypesProps) {
  const { label, fullWidth, helperText, error, values, onChanged, unitTypes } =
    props;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Constant store
  const { unitSubTypes } = useSelector((state: RootState) => state.constant);

  /// Constant repository
  const constantRepo = new ConstantRepository();

  /// Options and option
  const [options, setOptions] = useState<UnitSubType[]>([]);
  const [option, setOption] = useState<UnitSubType[]>([]);

  /// Initialize component
  useEffect(() => {
    constantRepo.getUnitSubTypes();
  }, []);

  /// When chaged [unitSubTypes]
  useEffect(() => {
    let value = [...unitSubTypes];
    if (unitTypes && unitTypes.length !== 0) {
      value = value.filter((e) => unitTypes.includes(e.unit_type_id!));
    }
    setOptions(value);
    if (option.length !== 0 && (unitTypes ?? [])?.length !== 0) {
      const any = option.some((e) => !unitTypes?.includes(e.unit_type_id!));
      if (any) onChanged([]);
    }
  }, [unitSubTypes, unitTypes]);

  /// When cahnged value
  useEffect(() => {
    if (!values || values.length === 0) return setOption([]);
    setOption(unitSubTypes.filter((e) => values.includes(e.id!)));
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        loading
        multiple
        fullWidth={fullWidth}
        options={options}
        value={option}
        groupBy={(option) => option?.unit_type?.translations?.name?.[lng] ?? ""}
        getOptionLabel={(option) => option.translations?.name?.[lng] ?? ""}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderTags={(value: readonly UnitSubType[], getTagProps) =>
          value.map((option: UnitSubType, index: number) => (
            <Chip
              variant="outlined"
              label={option.translations?.name?.[lng]}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(_, v) => onChanged(v.map((e) => e.id!))}
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

export default SelectUnitSubTypes;
