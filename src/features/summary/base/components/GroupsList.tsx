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
import LoadingComp from "@Components/LoadingComp";
import { useSummaryDialog } from "../helper/summary_helper";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import TranslateHelper from "@Local/index";

function GroupsList() {
  /// Account store
  const { isInternal, isOwner } = useAccount();

  /// Company region store
  const { groups, group, region, groupsLoading } = useSelector(
    (state: RootState) => state.companyRegion
  );

  /// Dialog hook
  const { openGroupDialog } = useSummaryDialog();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Company region repo
  const companyRegionRepo = new CompanyRegionRepository();

  /// Get region groups
  const getRegionGroups = async () => {
    if (!region) return;
    await companyRegionRepo.getRegionGroups(region!.id!);
  };

  /// Initialize component
  useEffect(() => {
    getRegionGroups();
  }, [region]);

  /// Select group
  const onSelectGroup = (value: CompanyGroup) => {
    if (value.id === group?.id) return;
    dispatch(setSelectedGroup(value));
  };

  /// Create group handle
  const onCreateGroupHandle = () => {
    openGroupDialog();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item flexGrow={1} p={2}>
            <Typography
              variant="h1"
              fontSize={19}
              children={TranslateHelper.groups()}
            />
          </Grid>
          <Grid item>
            <VisibilityComp visibility={isInternal || isOwner}>
              <IconButton onClick={onCreateGroupHandle}>
                <AddIcon />
              </IconButton>
            </VisibilityComp>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} children={<Divider />} />
      <Grid mt={1} item xs={12}>
        <LoadingComp loading={groupsLoading}>
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
        </LoadingComp>
      </Grid>
    </Grid>
  );
}

export default GroupsList;
