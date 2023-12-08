import { useDialog } from "@Utils/hooks/dialog_hook";
import RegionDialog from "../dialogs/RegionDialog";
import { CompanyGroup, CompanyRegion } from "@Models/index";
import { store } from "@Store/index";
import { setEditGroup, setEditRegion } from "@Store/company_region_store";
import GroupDialog from "../dialogs/GroupDialog";
import { ERegionFilterType, ERegionSortType } from "../entities/enums";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ReactNode } from "react";

/**
 * Summary dialogs hook
 */
export function useSummaryDialog() {
  const { openDialog } = useDialog();
  return {
    openRegionDialog: (region?: CompanyRegion | null) => {
      if (region) store.dispatch(setEditRegion(region));
      openDialog(<RegionDialog />, "md");
    },
    openGroupDialog: (group?: CompanyGroup | null) => {
      if (group) store.dispatch(setEditGroup(group));
      openDialog(<GroupDialog />, "xs");
    },
  };
}

/**
 * Get Title of region filter type
 * @param type
 * @returns
 */
export function getRegionFilterTitle(type: ERegionFilterType): string {
  switch (type) {
    case ERegionFilterType.Name:
      return "Name";
    case ERegionFilterType.Address:
      return "Address";
    case ERegionFilterType.Zipcode:
      return "Zipcode";
    default:
      return "";
  }
}

/**
 * Get Title of region sort type
 * @param type
 * @returns
 */
export function getRegionSortTitle(type: ERegionSortType): string {
  switch (type) {
    case ERegionSortType.Alphabetically:
      return "Alphabetically";
    case ERegionSortType.CreatedDate:
      return "Created Date";
    default:
      return "";
  }
}

/**
 * Get Icon of region sort type
 * @param type
 * @returns
 */
export function getRegionSortIcon(type: ERegionSortType): ReactNode {
  switch (type) {
    case ERegionSortType.Alphabetically:
      return <SortByAlphaIcon fontSize="small" />;
    case ERegionSortType.CreatedDate:
      return <CalendarTodayIcon fontSize="small" />;
    default:
      return <SortByAlphaIcon fontSize="small" />;
  }
}
