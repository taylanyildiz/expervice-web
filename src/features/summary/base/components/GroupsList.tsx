import CompanyRegionRepository from "@Repo/company_region_repository";
import { AppDispatch, RootState } from "@Store/index";
import {
  Divider,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import VisibilityComp from "@Components/VisibilityComp";
import SelectedGroupBox from "./SelectedGroupBox";
import { CompanyGroup } from "@Models/index";
import { setSelectedGroup } from "@Store/company_region_store";
import { useDialog } from "@Utils/hooks/dialog_hook";
import GroupDialog from "../dialogs/GroupDialog";

function GroupsList() {
  /// Company region store
  const { groups, group, region } = useSelector(
    (state: RootState) => state.companyRegion
  );

  /// Dialog hook
  const { openDialog } = useDialog();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Company region repo
  const companyRegionRepo = new CompanyRegionRepository();

  /// Get region groups
  const getRegionGroups = async () => {
    await companyRegionRepo.getRegionGroups();
  };

  /// Initialize component
  useEffect(() => {
    getRegionGroups();
  }, [region]);

  /// Select group
  const onSelectGroup = (group: CompanyGroup) => {
    dispatch(setSelectedGroup(group));
  };

  /// Create group handle
  const onCreateGroupHandle = () => {
    openDialog(<GroupDialog />, "xs");
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item flexGrow={1} p={2}>
            <Typography variant="h1" fontSize={19} children="Groups" />
          </Grid>
          <Grid item>
            <IconButton onClick={onCreateGroupHandle}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} children={<Divider />} />
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <VisibilityComp
              visibility={Boolean(group)}
              children={<SelectedGroupBox />}
            />
            {groups?.rows.map((item, index) => (
              <ListItemButton
                onClick={() => onSelectGroup(item)}
                key={index}
                selected={item.id == group?.id}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupsList;
