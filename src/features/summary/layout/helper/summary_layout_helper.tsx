import { useDialog } from "@Utils/hooks/dialog_hook";
import LanguageDialog from "../dialogs/LanguageDialog";

export function useSummaryDialog() {
  const { openDialog } = useDialog();
  return {
    openLanguageDialog: () => openDialog(<LanguageDialog />, "xs"),
  };
}
