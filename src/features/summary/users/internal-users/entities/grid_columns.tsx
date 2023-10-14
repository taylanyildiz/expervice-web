import StatusBox from "@Components/StatusBox";
import InternalUser from "@Models/internal-user/internal_user";
import { GridColDef } from "@mui/x-data-grid";
import { useInternalDialog } from "../helper/internal_user_helper";

/// Grid columns
const columns: GridColDef<InternalUser>[] = [
  {
    field: "name",
    headerName: "Name",
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
    headerName: "Role",
    width: 200,
    valueGetter: (params) => {
      const row = params.row;
      const role = row.role;
      return `${role?.translations?.role?.en}`;
    },
  },
  {
    field: "login",
    headerName: "Login",
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
    headerName: "Email",
    width: 300,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 300,
  },
];

export default columns;
