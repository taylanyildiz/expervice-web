import { useDialog } from "@Utils/hooks/dialog_hook";
import CompanyDialog from "..";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";

/// User store
export function useUser() {
  return useSelector((state: RootState) => state.user);
}

/**
 * Company dialog hook
 */
export function useCompanyDialog() {
  const { openDialog } = useDialog();
  return {
    openCompanyDialog: () => openDialog(<CompanyDialog />, "md"),
  };
}
