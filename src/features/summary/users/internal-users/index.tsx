import InternalUsersTable from "./components/InternalUsersTable";
import "../../../../assets/css/internal_users.css";
import GridTableHeader from "@Components/GridTableHeader";
import { useInternalDialog } from "./helper/internal_user_helper";

function InternalUsersPage() {
  /// Dialog hook
  const openInternalDialog = useInternalDialog();

  /// Add handle
  const onAddHandle = () => {
    openInternalDialog();
  };

  /// Filter handle
  const onFilterHandle = () => {};

  /// Export handle
  const onExportHandle = () => {};

  return (
    <div className="internal-users-layout">
      <GridTableHeader
        title="Internal Users"
        onAdd={onAddHandle}
        onFilter={onFilterHandle}
        onExport={onExportHandle}
      />
      <InternalUsersTable />
    </div>
  );
}

export default InternalUsersPage;
