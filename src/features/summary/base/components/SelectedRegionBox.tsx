import { RootState } from "@Store/index";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useSelector } from "react-redux";
import Colors from "@Themes/colors";
import { useSummaryDialog } from "../helper/summary_helper";

function SelectedRegionBox() {
  /// Company Region stroe
  const { region } = useSelector((state: RootState) => state.companyRegion);

  /// Dialog hooks
  const { openRegionDialog } = useSummaryDialog();

  /// Creator display name
  const creatorDisplayName = `${region?.creator?.first_name} ${region?.creator?.last_name}`;

  /// Click home icon
  const onClickHome = () => {};

  /// Click info icon
  /// to open region dialog
  const onClickInfo = () => {
    openRegionDialog(region);
  };

  return (
    <Box sx={{ pl: 1, py: 2, mb: 2, backgroundColor: Colors.selected }}>
      <Grid container alignItems="start">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                children={region?.name}
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
              <IconButton sx={{ p: 0 }} onClick={onClickHome}>
                <HomeOutlinedIcon sx={{ height: 20, width: 20 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectedRegionBox;
