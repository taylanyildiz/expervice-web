import UnitsTable from "./components/UnitsTable";
import GridTableHeader from "@Components/GridTableHeader";
import { useUnitDialog } from "./helper/unit_helper";
import "../../../assets/css/units.css";

function UnitsPage() {
  /// Unit dialog hook
  const unitDialog = useUnitDialog();

  return (
    <div className="units-layout">
      <GridTableHeader
        title="Units"
        onAdd={() => unitDialog()}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <UnitsTable />
    </div>
  );
}

export default UnitsPage;
