import UnitsTable from "./components/UnitsTable";
import GridTableHeader from "@Components/GridTableHeader";
import { useUnitDialog } from "./helper/unit_helper";
import "../../../assets/css/units.css";

function UnitsPage() {
  /// Unit dialog hook
  const { openUnitDialog } = useUnitDialog();

  return (
    <div className="units-layout">
      <GridTableHeader
        title="Units"
        onAdd={() => openUnitDialog()}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <UnitsTable />
    </div>
  );
}

export default UnitsPage;
