import StatusBox from "@Components/StatusBox";
import InternalUser from "@Models/internal-user/internal_user";
import { setInternalUser } from "@Store/internal_user_store";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import InternalUserDialog from "../dialogs/InternalUserDialog";

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
      const dispatch = useDispatch();
      const { openDialog } = useDialog();
      return (
        <p
          className="grid-selectable"
          onClick={() => {
            dispatch(setInternalUser(row));
            openDialog(<InternalUserDialog />, "md");
          }}
        >
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
