import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@Store/index";
import { setCommonSideBar } from "@Store/summary_store";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function AppBarMenuButton() {
  /// Summary store
  const { commonSideBar } = useSelector((state: RootState) => state.summary);

  /// dispatch
  const dispatch = useDispatch();

  /// Toggle menu drawer
  const handleToggleMenu = () => {
    dispatch(setCommonSideBar(!commonSideBar));
  };

  return (
    <IconButton onClick={handleToggleMenu}>
      {!commonSideBar ? (
        <MenuIcon sx={{ height: 40, width: 40 }} />
      ) : (
        <CloseIcon sx={{ height: 40, width: 40 }} />
      )}
    </IconButton>
  );
}

export default AppBarMenuButton;
