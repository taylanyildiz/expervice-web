import StatusBox from "@Components/StatusBox";
import InternalUser from "@Models/internal-user/internal_user";
import { GridColDef } from "@mui/x-data-grid";
import { useInternalDialog } from "../helper/internal_user_helper";
import TranslateHelper from "@Local/index";

/// Grid columns
const columns: GridColDef<InternalUser>[] = [
  {
    field: "name",
    headerName: TranslateHelper.name(),
    width: 300,
    headerAlign: "left",
    renderCell: (params) => {
      const row = params.row;
      const firstName = row.first_name;
      const lastName = row.last_name;
      const openInternalDialog = useInternalDialog();
      return (
        <p className="grid-selectable" onClick={() => openInternalDialog(row)}>
          {firstName} {lastName}
        </p>
      );
    },
  },
  {
    field: "role",
    headerName: TranslateHelper.role(),
    width: 200,
    valueGetter: (params) => {
      const row = params.row;
      const role = row.role;
      return `${role?.translations?.role?.en}`;
    },
  },
  {
    field: "login",
    headerName: TranslateHelper.login(),
    minWidth: 140,
    renderCell: (params) => {
      const row = params.row;
      const status = row.status;
      const email = row.email;
      return <StatusBox email={email} status={status!} />;
    },
  },
  {
    field: "email",
    headerName: TranslateHelper.email(),
    width: 300,
  },
  {
    field: "phone",
    headerName: TranslateHelper.phone(),
    width: 300,
  },
];

export default columns;
