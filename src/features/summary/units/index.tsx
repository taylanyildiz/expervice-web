import GridTableHeader from "@Components/GridTableHeader";
import { useUnit, useUnitDialog } from "./helper/unit_helper";
import { Outlet } from "react-router-dom";
import UnitTabs from "./components/UnitTabs";
import "../../../assets/css/units.css";
import { useQuery } from "@Utils/functions";
import { useEffect } from "react";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setUnitDialogStatus, setUnitId } from "@Store/unit_store";

function UnitsPage() {
  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const { unitId } = useUnit();

  /// Unit dialog hook
  const { openUnitDialog, closeDialog } = useUnitDialog();

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

  return (
    <div className="units-layout">
      <GridTableHeader
        title="Units"
        onAdd={() => openUnitDialog()}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <UnitTabs />
      <Outlet />
    </div>
  );
}

export default UnitsPage;
