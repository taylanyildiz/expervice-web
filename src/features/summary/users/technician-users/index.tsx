import GridTableHeader from "@Components/GridTableHeader";
import TechnicianUsersTable from "./components/TechnicianUsersTable";
import { useTechnician, useTechnicianDialog } from "./helper/technician_helper";
import TranslateHelper from "@Local/index";
import TechnicianFilterDrawer from "./components/TechnicianFilterDrawer";
import { useDispatch } from "react-redux";
import { setTechnicianFilterDrawerStatus } from "@Store/technician_store";
import "../../../../assets/css/technician_users.css";
import { useAccount } from "@Features/summary/company/helper/company_helper";

function TechnicianUsersPage() {
  /// Technician dialog
  const technicianDialog = useTechnicianDialog();

  /// Account store
  const { isOwner, isInternal } = useAccount();

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
        visibilityAdd={isOwner || isInternal}
      />
      <TechnicianUsersTable />
      <TechnicianFilterDrawer />
    </div>
  );
}

export default TechnicianUsersPage;
