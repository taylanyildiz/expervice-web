import Colors from "@Themes/colors";
import { AppBar, Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuCustomLink from "@Components/MenuCustomLink";
import ElevatorIcon from "@mui/icons-material/Elevator";
import EscalatorIcon from "@mui/icons-material/Escalator";
import FeedIcon from "@mui/icons-material/Feed";
import ContactsIcon from "@mui/icons-material/Contacts";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import DevicesIcon from "@mui/icons-material/Devices";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import ERouter from "@Routes/router_enum";
import { useNavigate } from "react-router-dom";
import { clearAll } from "@Store/index";

function SummaryAppBar() {
  /// Navigate
  const navigate = useNavigate();

  /// Logout handle
  const onLogoutHandle = () => {
    clearAll();
    navigate(ERouter.Base);
  };

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
              <MenuCustomLink
                color="white"
                title="Jobs"
                children={[
                  {
                    prefix: <WorkIcon />,
                    title: "All Jobs",
                    onClick: () => {},
                  },
                  {
                    prefix: <SettingsIcon />,
                    title: "Maintenaces",
                    onClick: () => {},
                  },
                  {
                    prefix: <ReportIcon />,
                    title: "Faults",
                    onClick: () => {},
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <MenuCustomLink
                color="white"
                title="Forms"
                children={[
                  {
                    prefix: <FeedIcon />,
                    title: "All Forms",
                    onClick: () => {},
                  },
                  {
                    prefix: <ContactsIcon />,
                    title: "Customer Forms",
                    onClick: () => {},
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <MenuCustomLink
                color="white"
                title="Units"
                children={[
                  {
                    prefix: <DevicesIcon />,
                    title: "All Units",
                    to: ERouter.Units,
                  },
                  {
                    prefix: <ElevatorIcon />,
                    title: "Elevators",
                    onClick: () => {},
                  },
                  {
                    prefix: <EscalatorIcon />,
                    title: "Escalators",
                    onClick: () => {},
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <MenuCustomLink
                title={
                  <Tooltip title="Add">
                    <IconButton size="small">
                      <AddOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                }
              />
            </Grid>
            <Grid item>
              <Tooltip title="Notifications">
                <IconButton size="small">
                  <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <MenuCustomLink
                color="white"
                title={
                  <Tooltip title="Users">
                    <IconButton size="small">
                      <GroupsOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                }
                children={[
                  {
                    to: ERouter.InternalUsers,
                    prefix: <GroupOutlinedIcon />,
                    title: "Internal Users",
                  },
                  {
                    prefix: <ContactsIcon />,
                    title: "Customer Users",
                  },
                  {
                    prefix: <EngineeringOutlinedIcon />,
                    title: "Technician Users",
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <MenuCustomLink
                withIcon={false}
                title={
                  <Tooltip title="Profile">
                    <IconButton size="small">
                      <Avatar
                        children="TY"
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 12,
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                }
                children={[
                  {
                    prefix: <AccountBoxIcon />,
                    title: "Profile",
                    onClick: () => {},
                  },
                  {
                    prefix: <LogoutIcon />,
                    title: "Logout",
                    onClick: onLogoutHandle,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default SummaryAppBar;
