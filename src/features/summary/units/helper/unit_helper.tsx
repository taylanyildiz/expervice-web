import UnitRepository from "@Repo/unit_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import UnitDialog from "../dialogs/UnitDialog";
import { useSelector } from "react-redux";
import { RootState, store } from "@Store/index";
import { setUnitId } from "@Store/unit_store";

/**
 * Unit store
 */
export function useUnit() {
  return useSelector((state: RootState) => state.unit);
}

/**
 * Open unit dialog
 */
export function useUnitDialog() {
  const { openDialog } = useDialog();
  return async (id?: number | string) => {
    if (id) {
      const unitId = typeof id === "string" ? parseInt(id) : id;
      store.dispatch(setUnitId(unitId));
    }
    openDialog(<UnitDialog />, "md");
  };
}
