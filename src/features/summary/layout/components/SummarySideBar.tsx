import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Utils/hooks";
import { setLeftSideBarStatus } from "@Utils/hooks/summary_hooks";
import Images from "@Assets/images";
import { Link } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import TextOutlineField from "@Components/TextOutlineField";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "../../../../assets/css/summary.css";

function SummarySideBar() {
  /// Summary store
  const { leftSideBarStatus } = useSelector(
    (state: RootState) => state.summary
  );

  const width = leftSideBarStatus ? 250 : 25;
  const scale = leftSideBarStatus ? 1.0 : 0.0;

  return (
    <Box className="summary-side-bar" sx={{ width: width }}>
      <ArrowButton />
      <Grid container className="side-child" sx={{ scale: `calc(${scale})` }}>
        <Grid item>
          <Link
            to={ERouter.Summary}
            children={Images.logoTextWithBlack({ height: 50 })}
          />
        </Grid>
        <Grid item xs={12} children={<Divider />} />
        <Grid item xs={12} px={3} mt={2}>
          <PrimaryButton
            height={30}
            fullWidth
            children="New Region"
            color="white"
            fontWeight="normal"
            fontSize={13}
            backgroundColor={Colors.primaryLight}
          />
        </Grid>
        <Grid item xs={12} px={3} mt={1}>
          <Grid container alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography children="Regions" fontSize={12} />
            </Grid>
            <Grid item>
              <IconButton>
                <FilterAltIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <SwapVertIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} px={3} mt={1}>
          <TextOutlineField fullWidth height={30} suffix={<SearchIcon />} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SummarySideBar;

function ArrowButton() {
  /// Summary store
  const { leftSideBarStatus } = useSelector(
    (state: RootState) => state.summary
  );
  /// Dispatch
  const dispatch = useDispatch<AppDispatch>();

  /// Click arrow icon
  /// Changed status of side bar
  const onClickHandle = () => {
    dispatch(setLeftSideBarStatus(!leftSideBarStatus));
  };

  const deg = leftSideBarStatus ? 0 : -180;

  return (
    <div
      className="side-bar-icon"
      style={{ transform: `rotate(${deg}deg)` }}
      onClick={onClickHandle}
    >
      <ArrowLeftIcon sx={{ fontSize: 30 }} />
    </div>
  );
}
