import { CompanyGroup } from "@Models/index";
import UserRepository from "@Repo/user_repository";
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

interface SelectUserGroupsProps {
  values?: number[] | null;
  regions?: number[];
  label?: string;
  fullWidth?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  onChanged: (value: number[] | null | undefined) => void;
}

function SelectUserGroups(props: SelectUserGroupsProps) {
  const { values, label, fullWidth, helperText, error, onChanged, regions } =
    props;

  /// User store
  const { groups } = useSelector((state: RootState) => state.user);
  const rows = groups.rows;

  /// User repository
  const userRepo = new UserRepository();

  /// Option - Options state
  const [options, setOptions] = useState<CompanyGroup[]>([]);
  const [option, setOption] = useState<CompanyGroup[]>([]);

  /// Initialize component
  useEffect(() => {
    let value = [...rows];
    if (regions && regions.length !== 0) {
      value = value.filter((e) => regions.includes(e.region_id!));
    }
    setOptions(value);
    if (regions && regions.length !== 0 && option.length !== 0) {
      const any = option.some((e) => !regions.includes(e.region_id!));
      if (any) onChanged([]);
    }
  }, [groups, regions]);

  useEffect(() => {
    userRepo.getGroups();
  }, []);

  ///
  useEffect(() => {
    if (!values || values.length === 0) return setOption([]);
    setOption(groups.rows.filter((e) => values.includes(e.id!)));
  }, [values]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        options={options}
        value={option}
        multiple
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(_, value) => onChanged(value.map((e) => e.id!))}
        renderTags={(value: readonly CompanyGroup[], getTagProps) =>
          value.map((option: CompanyGroup, index: number) => (
            <Chip
              variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
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
        groupBy={(option) => JSON.stringify(option.region) ?? ""}
        getOptionLabel={(option) => option.name ?? ""}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{JSON.parse(params.group)["name"]}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </ThemeProvider>
  );
}

export default SelectUserGroups;
