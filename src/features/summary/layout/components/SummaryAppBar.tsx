import Colors from "@Themes/colors";
import { AppBar, Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuTextLink from "@Components/MenuTextLink";
import ERouter from "@Routes/router_enum";

function SummaryAppBar() {
  return (
    <AppBar
      className="summary-app-bar"
      elevation={0}
      sx={{ backgroundColor: Colors.appBarColor }}
    >
      <Grid container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Grid container columnSpacing={5}>
            <Grid item>
              <MenuTextLink
                color="white"
                title="Jobs"
                children={[
                  {
                    title: "All",
                    onClick: () => {},
                  },
                  {
                    title: "Maintenaces",
                    onClick: () => {},
                  },
                  {
                    title: "Faults",
                    onClick: () => {},
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <MenuTextLink color="white" to={ERouter.Forms} title="Forms" />
            </Grid>
            <Grid item>
              <MenuTextLink color="white" to={ERouter.Units} title="Units" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton size="small">
                  <AddOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Notifications">
                <IconButton size="small">
                  <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Users">
                <IconButton size="small">
                  <GroupsOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Profile">
                <IconButton size="small">
                  <Avatar
                    children="T"
                    sx={{ width: 30, height: 30, fontSize: 12, color: "white" }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default SummaryAppBar;
