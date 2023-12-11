import GridTableHeader from "@Components/GridTableHeader";
import TechnicianUsersTable from "./components/TechnicianUsersTable";
import "../../../../assets/css/technician_users.css";
import { useTechnicianDialog } from "./helper/technician_helper";
import TranslateHelper from "@Local/index";

function TechnicianUsersPage() {
  /// Technician dialog
  const technicianDialog = useTechnicianDialog();

  return (
    <div className="technicians-layout">
      <GridTableHeader
        title={TranslateHelper.technicians()}
        onAdd={() => technicianDialog()}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <TechnicianUsersTable />
    </div>
  );
}

export default TechnicianUsersPage;
