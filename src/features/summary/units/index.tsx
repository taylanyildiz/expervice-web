import UnitsTable from "./components/UnitsTable";
import "../../../assets/css/units.css";
import GridTableHeader from "@Components/GridTableHeader";

function UnitsPage() {
  return (
    <div className="units-layout">
      <GridTableHeader
        title="Units"
        onAdd={() => {}}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <UnitsTable />
    </div>
  );
}

export default UnitsPage;
