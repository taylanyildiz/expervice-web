import GridTableHeader from "@Components/GridTableHeader";
import { useUnit, useUnitDialog } from "./helper/unit_helper";
import { Outlet } from "react-router-dom";
import UnitTabs from "./components/UnitTabs";
import "../../../assets/css/units.css";
import { useQuery } from "@Utils/functions";
import { useEffect } from "react";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import {
  setSelectedUnits,
  setUnitDialogStatus,
  setUnitId,
} from "@Store/unit_store";
import PrimaryButton from "@Components/PrimaryButton";
import VisibilityComp from "@Components/VisibilityComp";
import { Typography } from "@mui/material";
import { useDialog } from "@Utils/hooks/dialog_hook";
import UnitRepository from "@Repo/unit_repository";

function UnitsPage() {
  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const { unitId, selectedUnits } = useUnit();

  /// Visibility of more actions
  const moreActions = selectedUnits.length !== 0;

  /// Unit repository
  const unitRepo = new UnitRepository();

  /// Unit dialog hook
  const { openUnitDialog, closeDialog, openAssignCustomerDialog } =
    useUnitDialog();

  /// Listen query params
  useEffect(() => {
    const id = parseInt(`${path.get("unitId")}`);
    dispatch(setUnitDialogStatus(false));
    dispatch(setUnitId(null));
    if (!id || isNaN(id)) deletePath("unitId");
    if (id || !isNaN(id)) dispatch(setUnitId(id));
  }, []);

  /// Listen unit id
  useEffect(() => {
    if (unitId) {
      setPath("unitId", unitId.toString());
      return openUnitDialog();
    }
    deletePath("unitId");
    dispatch(setUnitDialogStatus(false));
    closeDialog();
  }, [unitId]);

  /// Delete units handle
  const deleteUnitsHandle = async () => {
    const confirm = await openConfirm(
      "Delete Units",
      "Are you sure to delete units?"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return unitRepo.deleteUnits(selectedUnits);
    });
    if (!result) return;
    unitRepo.getUnits();
  };

  return (
    <div className="units-layout">
      <GridTableHeader
        title="Units"
        onAdd={() => openUnitDialog()}
        onFilter={() => {}}
        onExport={() => {}}
        more={[
          <VisibilityComp visibility={moreActions}>
            <Typography
              fontSize={13}
              children={`${selectedUnits.length} Selected`}
            />
          </VisibilityComp>,
          <VisibilityComp visibility={moreActions}>
            <PrimaryButton
              onClick={() => {
                dispatch(setSelectedUnits([]));
              }}
              fontWeight="normal"
              variant="outlined"
              children="Cancel"
            />
          </VisibilityComp>,
          <VisibilityComp visibility={moreActions}>
            <PrimaryButton
              fontWeight="normal"
              variant="outlined"
              children="Assign Customer"
              onClick={() => {
                openAssignCustomerDialog();
              }}
            />
          </VisibilityComp>,
          <VisibilityComp visibility={moreActions}>
            <PrimaryButton
              fontWeight="normal"
              variant="outlined"
              children="Delete"
              onClick={deleteUnitsHandle}
            />
          </VisibilityComp>,
        ]}
      />
      <UnitTabs />
      <Outlet />
    </div>
  );
}

export default UnitsPage;
