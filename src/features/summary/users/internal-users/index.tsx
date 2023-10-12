import InternalUsersTable from "./components/InternalUsersTable";
import "../../../../assets/css/internal_users.css";
import GridTableHeader from "@Components/GridTableHeader";
import { useEffect } from "react";
import InternalUserRepository from "@Repo/internal_user_repositoy";
import { useDialog } from "@Utils/hooks/dialog_hook";
import InternalUserDialog from "./dialogs/InternalUserDialog";

function InternalUsersPage() {
  /// Dialog hook
  const { openDialog } = useDialog();

  /// Add handle
  const onAddHandle = () => {
    openDialog(<InternalUserDialog />, "md");
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
