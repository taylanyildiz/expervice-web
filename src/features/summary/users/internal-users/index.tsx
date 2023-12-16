import InternalUsersTable from "./components/InternalUsersTable";
import GridTableHeader from "@Components/GridTableHeader";
import { useInternal, useInternalDialog } from "./helper/internal_user_helper";
import TranslateHelper from "@Local/index";
import "../../../../assets/css/internal_users.css";
import InternalUserFilterDrawer from "./components/InternalUserFilterDrawer";
import { useDispatch } from "react-redux";
import { setInternalUserFilterDrawerStatus } from "@Store/internal_user_store";

function InternalUsersPage() {
  /// Dialog hook
  const openInternalDialog = useInternalDialog();

  /// Internal store
  const { filterCount } = useInternal();

  /// Dispatch
  const dispatch = useDispatch();

  /// Add handle
  const onAddHandle = () => {
    openInternalDialog();
  };

  /// Filter handle
  const onFilterHandle = () => {
    dispatch(setInternalUserFilterDrawerStatus(true));
  };

  /// Export handle
  const onExportHandle = () => {};

  return (
    <div className="internal-users-layout">
      <GridTableHeader
        title={TranslateHelper.internalUsers()}
        onAdd={onAddHandle}
        onFilter={onFilterHandle}
        onExport={onExportHandle}
        filterCount={filterCount}
      />
      <InternalUsersTable />
      <InternalUserFilterDrawer />
    </div>
  );
}

export default InternalUsersPage;
