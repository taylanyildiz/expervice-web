import { AppDispatch, RootState } from "@Store/index";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import Colors from "@Themes/colors";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { setEditGroup } from "@Store/company_region_store";
import GroupDialog from "../dialogs/GroupDialog";

function SelectedGroupBox() {
  /// Company Region stroe
  const { group } = useSelector((state: RootState) => state.compay_region);

  /// Dispatch
  const dispatch: AppDispatch = useDispatch();

  /// Dialog hooks
  const { openDialog } = useDialog();

  /// Creator display name
  const creatorDisplayName = `${group?.creator?.first_name} ${group?.creator?.last_name}`;

  /// Click info
  /// to open group dialog
  const onClickInfo = () => {
    dispatch(setEditGroup(group));
    openDialog(<GroupDialog />, "xs");
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
      </Grid>
    </Box>
  );
}

export default SelectedGroupBox;