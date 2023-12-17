import GridTableHeader from "@Components/GridTableHeader";
import TechnicianUsersTable from "./components/TechnicianUsersTable";
import { useTechnician, useTechnicianDialog } from "./helper/technician_helper";
import TranslateHelper from "@Local/index";
import TechnicianFilterDrawer from "./components/TechnicianFilterDrawer";
import { useDispatch } from "react-redux";
import { setTechnicianFilterDrawerStatus } from "@Store/technician_store";
import "../../../../assets/css/technician_users.css";

function TechnicianUsersPage() {
  /// Technician dialog
  const technicianDialog = useTechnicianDialog();

  /// Technician store
  const { filterCount } = useTechnician();

  /// Dispatch
  const dispatch = useDispatch();

  return (
    <div className="technicians-layout">
      <GridTableHeader
        title={TranslateHelper.technicians()}
        onAdd={() => technicianDialog()}
        onFilter={() => {
          dispatch(setTechnicianFilterDrawerStatus(true));
        }}
        onExport={() => {}}
        filterCount={filterCount}
      />
      <TechnicianUsersTable />
      <TechnicianFilterDrawer />
    </div>
  );
}

export default TechnicianUsersPage;
