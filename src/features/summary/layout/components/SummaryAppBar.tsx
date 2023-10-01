import Colors from "@Themes/colors";
import { AppBar } from "@mui/material";

function SummaryAppBar() {
  return (
    <AppBar
      className="summary-app-bar"
      elevation={0}
      sx={{ backgroundColor: Colors.appBarColor }}
    ></AppBar>
  );
}

export default SummaryAppBar;
