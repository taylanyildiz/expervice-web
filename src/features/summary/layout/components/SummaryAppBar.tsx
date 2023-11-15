import Colors from "@Themes/colors";
import { AppBar, Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuCustomLink from "@Components/MenuCustomLink";
import ElevatorIcon from "@mui/icons-material/Elevator";
import EscalatorIcon from "@mui/icons-material/Escalator";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import { logout } from "@Store/account_store";
import NotificationIcon from "./NotificationIcon";
import SummarizeIcon from "@mui/icons-material/Summarize";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { caption } from "@Utils/functions";
import { useJobDialog } from "@Features/summary/jobs/helper/job_helper";
import { useUnitDialog } from "@Features/summary/units/helper/unit_helper";
import { useInternalDialog } from "@Features/summary/users/internal-users/helper/internal_user_helper";
import { useTechnicianDialog } from "@Features/summary/users/technician-users/helper/technician_helper";
import { useCustomerDialog } from "@Features/summary/users/customer-users/helpers/customer_user_helper";
import { useFormDialog } from "@Features/summary/forms/helper/form_helper";
import { useProfileDialog } from "@Features/summary/profile/helper/profile_helper";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useCompanyDialog } from "@Features/summary/company/helper/company_helper";

function SummaryAppBar() {
  /// Navigate
  const navigate = useNavigate();

  /// Account store
  const { user } = useSelector((state: RootState) => state.account);
  const displayName = `${user?.first_name} ${user?.last_name}`;
  const isOwner = user?.role_id === 3;

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Logout handle
  const onLogoutHandle = async () => {
    dispatch(logout());
    navigate(ERouter.Base);
  };

  const { openJobDialog } = useJobDialog();
  const { openUnitDialog } = useUnitDialog();
  const openInternalDialog = useInternalDialog();
  const openTechnicianDialog = useTechnicianDialog();
  const { openCustomerDialog } = useCustomerDialog();
  const { openFormDialog } = useFormDialog();
  const { openProfileDialog } = useProfileDialog();
  const { openCompanyDialog } = useCompanyDialog();

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
                    prefix: <SummarizeIcon />,
                    title: "Summary",
                    to: ERouter.Summary,
                  },
                  {
                    prefix: <WorkIcon />,
                    title: "All Jobs",
                    to: ERouter.Jobs,
                  },
                  {
                    prefix: <ReportIcon />,
                    title: "Faults",
                    to: { pathname: ERouter.Jobs, search: "type=1" },
                  },
                  {
                    prefix: <SettingsIcon />,
                    title: "Maintenaces",
                    to: { pathname: ERouter.Jobs, search: "type=2" },
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <MenuCustomLink color="white" title="Forms" to={ERouter.Forms} />
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
                    to: {
                      pathname: ERouter.Units,
                      search: "unit_type=1",
                    },
                  },
                  {
                    prefix: <EscalatorIcon />,
                    title: "Escalators",
                    to: {
                      pathname: ERouter.Units,
                      search: "unit_type=2",
                    },
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
                withIcon={false}
                title={
                  <Tooltip title="Add">
                    <>
                      <IconButton size="small">
                        <AddOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </>
                  </Tooltip>
                }
                children={[
                  {
                    prefix: <WorkIcon />,
                    title: "Add Job",
                    onClick: openJobDialog,
                  },
                  {
                    prefix: <DevicesIcon />,
                    title: "Add Unit",
                    onClick: openUnitDialog,
                  },
                  {
                    prefix: <GroupOutlinedIcon />,
                    title: "Add Technician User",
                    onClick: openTechnicianDialog,
                  },
                  {
                    prefix: <GroupOutlinedIcon />,
                    title: "Add Internal User",
                    onClick: openInternalDialog,
                  },
                  {
                    prefix: <GroupOutlinedIcon />,
                    title: "Add Customer User",
                    onClick: openCustomerDialog,
                  },
                  {
                    prefix: <UploadFileIcon />,
                    title: "Add Form",
                    onClick: openFormDialog,
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Notifications">
                <>
                  <NotificationIcon />
                </>
              </Tooltip>
            </Grid>
            <Grid item>
              <MenuCustomLink
                color="white"
                withIcon={false}
                title={
                  <Tooltip title="Users">
                    <>
                      <IconButton size="small">
                        <GroupsOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </>
                  </Tooltip>
                }
                children={[
                  {
                    to: ERouter.InternalUsers,
                    prefix: <GroupOutlinedIcon />,
                    title: "Internal Users",
                  },
                  {
                    to: ERouter.CustomerUsers,
                    prefix: <ContactsIcon />,
                    title: "Customer Users",
                  },
                  {
                    to: ERouter.TechnicianUsers,
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
                    <>
                      <IconButton size="small">
                        <Avatar
                          children={caption(displayName)}
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: 12,
                            color: "white",
                          }}
                        />
                      </IconButton>
                    </>
                  </Tooltip>
                }
                children={[
                  {
                    prefix: <AccountBoxIcon />,
                    title: displayName,
                    onClick: openProfileDialog,
                  },
                  {
                    visibility: isOwner,
                    prefix: <ApartmentIcon />,
                    title: "Company Settings",
                    onClick: openCompanyDialog,
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
