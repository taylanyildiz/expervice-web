import MenuCustomLink from "@Components/MenuCustomLink";
import ScalableButton from "@Components/ScalableButton";
import TranslateHelper from "@Local/index";
import ERouter from "@Routes/router_enum";
import { RootState } from "@Store/index";
import { setCommonSideBar } from "@Store/summary_store";
import { setLanguage } from "@Store/user_store";
import Colors from "@Themes/colors";
import theme from "@Themes/index";
import { Drawer, Stack, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

type LinkType = {
  to?: string;
  title: string;
  children?: any[];
  onClick?: () => void;
};

function SummaryDrawer() {
  /// Summary store
  const { commonSideBar } = useSelector((state: RootState) => state.summary);

  /// Langauges from Constant Store
  const { languages } = useSelector((state: RootState) => state.constant);

  /// Dispatch
  const dispatch = useDispatch();

  /// Close drawer
  const handleClose = () => {
    dispatch(setCommonSideBar(false));
  };

  /// Links
  const links: LinkType[] = [
    {
      title: TranslateHelper.product(),
      to: ERouter.Product,
      onClick: handleClose,
    },
    {
      title: TranslateHelper.pricing(),
      to: ERouter.Pricing,
      onClick: handleClose,
    },
    {
      title: TranslateHelper.resources(),
      to: ERouter.Resources,
      onClick: handleClose,
    },
    {
      title: TranslateHelper.support(),
      to: ERouter.Support,
      onClick: handleClose,
    },
    {
      title: TranslateHelper.languages(),
      children: languages.map((e) => ({
        onClick: () => {
          dispatch(setLanguage(e));
        },
        title: e.native,
        suffix: e.emoji,
      })),
    },
    {
      title: TranslateHelper.login(),
      to: ERouter.Login,
      onClick: handleClose,
    },
  ];

  /// Is up md
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Drawer
      anchor="right"
      open={!md && commonSideBar}
      PaperProps={{
        sx: { width: "100%" },
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
            {...item}
            color={Colors.primary}
            key={`menu-item-${index}`}
            fontWeight="bold"
          />
        ))}
      </Stack>
    </Drawer>
  );
}

export default SummaryDrawer;
