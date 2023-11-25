import { AppDispatch, RootState } from "@Store/index";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import Colors from "@Themes/colors";
import { setEditGroup } from "@Store/company_region_store";
import { useSummaryDialog } from "../helper/summary_helper";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import VisibilityComp from "@Components/VisibilityComp";

function SelectedGroupBox() {
  /// Account store
  const { isInternal, isOwner } = useAccount();

  /// Company Region stroe
  const { group } = useSelector((state: RootState) => state.companyRegion);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Dialog hooks
  const { openGroupDialog } = useSummaryDialog();

  /// Creator display name
  const creatorDisplayName = `${group?.creator?.first_name} ${group?.creator?.last_name}`;

  /// Click info
  /// to open group dialog
  const onClickInfo = () => {
    dispatch(setEditGroup(group));
    openGroupDialog(group);
  };

  return (
    <Box sx={{ pl: 1, py: 2, mb: 2, backgroundColor: Colors.selected }}>
      <Grid container alignItems="start">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                children={group?.name}
                sx={{
                  overflow: "clip",
                  textOverflow: "ellipsis",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                fontSize={12}
                children={creatorDisplayName}
              />
            </Grid>
          </Grid>
        </Grid>
        <VisibilityComp visibility={isInternal || isOwner}>
          <Grid item xs={2}>
            <Grid container rowSpacing={0.4}>
              <Grid item xs={12}>
                <IconButton sx={{ p: 0 }} onClick={onClickInfo}>
                  <InfoOutlinedIcon sx={{ height: 20, width: 20 }} />
                </IconButton>
              </Grid>
              <Grid item xs={12} columnSpacing={2}>
                <IconButton sx={{ p: 0 }}>
                  <HomeOutlinedIcon sx={{ height: 20, width: 20 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </VisibilityComp>
      </Grid>
    </Box>
  );
}

export default SelectedGroupBox;
