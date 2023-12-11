import MenuCustomLink from "@Components/MenuCustomLink";
import ScalableButton from "@Components/ScalableButton";
import TranslateHelper from "@Local/index";
import ERouter from "@Routes/router_enum";
import { RootState } from "@Store/index";
import { setCommonSideBar } from "@Store/summary_store";
import Colors from "@Themes/colors";
import theme from "@Themes/index";
import { Drawer, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

/// Links
const links: { to: string; title: string }[] = [
  {
    title: TranslateHelper.product(),
    to: ERouter.Product,
  },
  {
    title: TranslateHelper.pricing(),
    to: ERouter.Pricing,
  },
  {
    title: TranslateHelper.resources(),
    to: ERouter.Resources,
  },
  {
    title: TranslateHelper.support(),
    to: ERouter.Support,
  },
  {
    title: TranslateHelper.login(),
    to: ERouter.Login,
  },
];

function SummaryDrawer() {
  /// Summary store
  const { commonSideBar } = useSelector((state: RootState) => state.summary);

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setCommonSideBar(false));
  };

  return (
    <Drawer
      anchor="right"
      open={commonSideBar}
      PaperProps={{
        sx: { width: "100%" },
      }}
      sx={{
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
      }}
    >
      <Stack mt={14} direction="column">
        <Stack direction="row" spacing={1} justifyContent="center">
          <ScalableButton
            link={ERouter.Regiter}
            onClick={() => {}}
            color={Colors.primary}
            backgroundColor={Colors.secodary}
            children={TranslateHelper.scheduleDemo()}
          />
          <ScalableButton
            link={ERouter.Pricing}
            children={TranslateHelper.tryItNow()}
          />
        </Stack>
      </Stack>
      <Stack px={3} mt={4} spacing={3}>
        {links.map((item, index) => (
          <MenuCustomLink
            onClick={handleClose}
            color={Colors.primary}
            key={`menu-item-${index}`}
            title={item.title}
            to={item.to}
            fontWeight="bold"
          />
        ))}
      </Stack>
    </Drawer>
  );
}

export default SummaryDrawer;
