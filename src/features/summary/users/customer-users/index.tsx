import GridTableHeader from "@Components/GridTableHeader";
import "../../../../assets/css/customer_users.css";
import CustomerUsersTable from "./components/CustomerUsersTable";
import {
  useCustomerDialog,
  useCutomerFilterCount,
} from "./helpers/customer_user_helper";
import { useDispatch } from "react-redux";
import { setCustomerFilterDrawer } from "@Store/customer_user_store";
import CustomerFilterDrawer from "./components/CustomerFilterDrawer";
import TranslateHelper from "@Local/index";
import { useAccount } from "@Features/summary/company/helper/company_helper";

function CustomerUsersPage() {
  /// Customer dialog hook
  const { openCustomerDialog } = useCustomerDialog();

  /// Account store
  const { isOwner, isInternal } = useAccount();

  /// Customer filter count
  const filterCount = useCutomerFilterCount();

  /// Dispatch
  const dispatch = useDispatch();

  /// Add handle
  const onAddHandle = () => {
    openCustomerDialog();
  };

  return (
    <div className="customer-users-layout">
      <GridTableHeader
        title={TranslateHelper.customerUsers()}
        onAdd={onAddHandle}
        onFilter={() => {
          dispatch(setCustomerFilterDrawer(true));
        }}
        onExport={() => {}}
        filterCount={filterCount}
        visibilityAdd={isOwner || isInternal}
      />
      <CustomerUsersTable />
      <CustomerFilterDrawer />
    </div>
  );
}

export default CustomerUsersPage;
