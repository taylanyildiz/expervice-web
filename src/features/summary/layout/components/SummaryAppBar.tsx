import Colors from "@Themes/colors";
import { AppBar, Avatar, Grid, IconButton, Tooltip } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuCustomLink from "@Components/MenuCustomLink";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@Store/index";
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
import MenuIcon from "@mui/icons-material/Menu";
import {
  useAccount,
  useCompanyDialog,
} from "@Features/summary/company/helper/company_helper";
import { useDialog } from "@Utils/hooks/dialog_hook";
import VisibilityComp from "@Components/VisibilityComp";
import theme from "@Themes/index";
import { setSummarySideBar } from "@Store/summary_store";
import i18n from "@Local/index";

function SummaryAppBar() {
  /// Navigate
  const navigate = useNavigate();

  /// Account store
  const { user, isInternal, isOwner } = useAccount();
  const displayName = `${user?.first_name} ${user?.last_name}`;

  /// Dialog hook
  const { openConfirm } = useDialog();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Logout handle
  const onLogoutHandle = async () => {
    const confirm = await openConfirm("Logout", "Are you sure to logout");
    if (!confirm) return;
    dispatch(logout());
    navigate(ERouter.Base);
    navigate(0);
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
          <Grid
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
            container
            columnSpacing={5}
          >
            {/* Jobs */}
            <Grid item>
              <MenuCustomLink
                color="white"
                title={i18n.t("jobs")}
                children={[
                  {
                    prefix: <SummarizeIcon />,
                    title: i18n.t("summary"),
                    to: ERouter.Summary,
                  },
                  {
                    prefix: <WorkIcon />,
                    title: i18n.t("allJobs"),
                    to: ERouter.Jobs,
                  },
                  {
                    prefix: <ReportIcon />,
                    title: i18n.t("faults"),
                    to: { pathname: ERouter.Jobs, search: "type=1" },
                  },
                  {
                    prefix: <SettingsIcon />,
                    title: i18n.t("maintenances"),
                    to: { pathname: ERouter.Jobs, search: "type=2" },
                  },
                ]}
              />
            </Grid>
            {/* Forms */}
            <VisibilityComp visibility={isInternal || isOwner}>
              <Grid item>
                <MenuCustomLink
                  color="white"
                  title={i18n.t("forms")}
                  to={ERouter.Forms}
                />
              </Grid>
            </VisibilityComp>
            {/* Units */}
            <Grid item>
              <MenuCustomLink
                color="white"
                title={i18n.t("units")}
                children={[
                  {
                    prefix: <DevicesIcon />,
                    title: i18n.t("unitsList"),
                    to: ERouter.Units,
                  },
                  {
                    prefix: <FmdGoodIcon />,
                    title: i18n.t("unitsMap"),
                    to: ERouter.UnitsMap,
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(setSummarySideBar(true));
              }}
              sx={{ color: "white" }}
            >
              <MenuIcon sx={{ height: 30, width: 30 }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <MenuCustomLink
                withIcon={false}
                title={
                  <Tooltip title={i18n.t("add")}>
                    <IconButton size="small">
                      <AddOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                }
                children={[
                  {
                    prefix: <WorkIcon />,
                    title: i18n.t("addJob"),
                    onClick: openJobDialog,
                  },
                  {
                    visibility: isInternal || isOwner,
                    prefix: <DevicesIcon />,
                    title: i18n.t("addUnit"),
                    onClick: openUnitDialog,
                  },
                  {
                    visibility: isInternal || isOwner,
                    prefix: <GroupOutlinedIcon />,
                    title: i18n.t("addTechnicianUser"),
                    onClick: openTechnicianDialog,
                  },
                  {
                    visibility: isInternal || isOwner,
                    prefix: <GroupOutlinedIcon />,
                    title: i18n.t("addInternalUser"),
                    onClick: openInternalDialog,
                  },
                  {
                    visibility: isInternal || isOwner,
                    prefix: <GroupOutlinedIcon />,
                    title: i18n.t("addCustomerUser"),
                    onClick: openCustomerDialog,
                  },
                  {
                    visibility: isInternal || isOwner,
                    prefix: <UploadFileIcon />,
                    title: i18n.t("addForm"),
                    onClick: openFormDialog,
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <Tooltip title={i18n.t("addTechnicianUser")}>
                <NotificationIcon />
              </Tooltip>
            </Grid>
            {/* Users */}
            <VisibilityComp visibility={isInternal || isOwner}>
              <Grid item>
                <MenuCustomLink
                  color="white"
                  withIcon={false}
                  title={
                    <Tooltip title={i18n.t("users")}>
                      <IconButton size="small">
                        <GroupsOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                  }
                  children={[
                    {
                      to: ERouter.InternalUsers,
                      prefix: <GroupOutlinedIcon />,
                      title: i18n.t("internalUsers"),
                    },
                    {
                      to: ERouter.CustomerUsers,
                      prefix: <ContactsIcon />,
                      title: i18n.t("customerUsers"),
                    },
                    {
                      to: ERouter.TechnicianUsers,
                      prefix: <EngineeringOutlinedIcon />,
                      title: i18n.t("technicianUsers"),
                    },
                  ]}
                />
              </Grid>
            </VisibilityComp>
            <Grid item>
              <MenuCustomLink
                withIcon={false}
                title={
                  <Tooltip title={i18n.t("profile")}>
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
                  </Tooltip>
                }
                children={[
                  {
                    prefix: <AccountBoxIcon />,
                    title: displayName,
                    onClick: openProfileDialog,
                  },
                  {
                    visibility: isOwner || isInternal,
                    prefix: <ApartmentIcon />,
                    title: i18n.t("companySettings"),
                    onClick: openCompanyDialog,
                  },
                  {
                    prefix: <LogoutIcon />,
                    title: i18n.t("logout"),
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
