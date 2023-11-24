import { useDialog } from "@Utils/hooks/dialog_hook";
import RegionDialog from "../dialogs/RegionDialog";
import { CompanyGroup, CompanyRegion } from "@Models/index";
import { store } from "@Store/index";
import { setEditGroup, setEditRegion } from "@Store/company_region_store";
import GroupDialog from "../dialogs/GroupDialog";

export function useSummaryDialog() {
  const { openDialog } = useDialog();

  return {
    openRegionDialog: (region?: CompanyRegion | null) => {
      if (region) store.dispatch(setEditRegion(region));
      openDialog(<RegionDialog />, "sm");
    },
    openGroupDialog: (group?: CompanyGroup | null) => {
      if (group) store.dispatch(setEditGroup(group));
      openDialog(<GroupDialog />, "xs");
    },
  };
}
