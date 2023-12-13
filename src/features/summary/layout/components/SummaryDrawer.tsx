import MenuCustomLink from "@Components/MenuCustomLink";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import ERouter from "@Routes/router_enum";
import { RootState } from "@Store/index";
import { setSummarySideBar } from "@Store/summary_store";
import theme from "@Themes/index";
import { Box, Drawer, Stack, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SummarizeIcon from "@mui/icons-material/Summarize";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import DevicesIcon from "@mui/icons-material/Devices";
import VisibilityComp from "@Components/VisibilityComp";

function SummaryDrawer() {
  /// Summary store
  const { summarySidebar } = useSelector((state: RootState) => state.summary);

  /// Account store
  const { isInternal, isOwner } = useAccount();

  /// dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setSummarySideBar(false));
  };

  /// Is up md
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Drawer
      onClose={handleClose}
      open={!md && summarySidebar}
      anchor="right"
      PaperProps={{
        sx: { width: 150 },
      }}
    >
      <Box p={4} display="flex">
        <Stack display="flex" direction="column" spacing={3}>
          <Box border={1} borderColor="divider" px={1} borderRadius={1}>
            <MenuCustomLink
              color="black"
              title="Jobs"
              children={[
                {
                  onClick: handleClose,
                  prefix: <SummarizeIcon />,
                  title: "Summary",
                  to: ERouter.Summary,
                },
                {
                  onClick: handleClose,
                  prefix: <WorkIcon />,
                  title: "All Jobs",
                  to: ERouter.Jobs,
                },
                {
                  onClick: handleClose,
                  prefix: <ReportIcon />,
                  title: "Faults",
                  to: { pathname: ERouter.Jobs, search: "type=1" },
                },
                {
                  onClick: handleClose,
                  prefix: <SettingsIcon />,
                  title: "Maintenaces",
                  to: { pathname: ERouter.Jobs, search: "type=2" },
                },
              ]}
            />
          </Box>
          <VisibilityComp visibility={isInternal || isOwner}>
            <Box border={1} borderColor="divider" px={1} borderRadius={1}>
              <MenuCustomLink
                onClick={handleClose}
                color="black"
                title="Forms"
                to={ERouter.Forms}
              />
            </Box>
          </VisibilityComp>
          <Box border={1} borderColor="divider" px={1} borderRadius={1}>
            <MenuCustomLink
              color="black"
              title="Units"
              children={[
                {
                  onClick: handleClose,
                  prefix: <DevicesIcon />,
                  title: "Units List",
                  to: ERouter.Units,
                },
                {
                  onClick: handleClose,
                  prefix: <FmdGoodIcon />,
                  title: "Units Map",
                  to: ERouter.UnitsMap,
                },
              ]}
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default SummaryDrawer;
