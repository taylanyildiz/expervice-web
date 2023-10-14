import GridTableHeader from "@Components/GridTableHeader";
import "../../../../assets/css/customer_users.css";
import CustomerUsersTable from "./components/CustomerUsersTable";
import { useCustomerDialog } from "./helpers/customer_user_helper";

function CustomerUsersPage() {
  /// Customer dialog hook
  const openCustomer = useCustomerDialog();

  /// Add handle
  const onAddHandle = () => {
    openCustomer();
  };

  return (
    <div className="customer-users-layout">
      <GridTableHeader
        title="Customer Users"
        onAdd={onAddHandle}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <CustomerUsersTable />
    </div>
  );
}

export default CustomerUsersPage;
