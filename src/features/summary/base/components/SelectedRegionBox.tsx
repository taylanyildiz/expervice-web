import { RootState } from "@Store/index";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useSelector } from "react-redux";
import Colors from "@Themes/colors";

function SelectedRegionBox() {
  /// Company Region stroe
  const { region } = useSelector((state: RootState) => state.compay_region);

  /// Creator display name
  const creatorDisplayName = `${region?.creator?.first_name} ${region?.creator?.last_name}`;

  return (
    <Box sx={{ pl: 1, py: 2, mb: 2, backgroundColor: Colors.selected }}>
      <Grid container alignItems="start">
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography children={region?.name} />
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
              <IconButton sx={{ p: 0 }}>
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

export default SelectedRegionBox;
