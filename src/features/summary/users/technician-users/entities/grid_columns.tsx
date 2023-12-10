import StatusBox from "@Components/StatusBox";
import TechnicianUser from "@Models/technician-user/technician_user";
import { GridColDef } from "@mui/x-data-grid";
import { useTechnicianDialog } from "../helper/technician_helper";
import TranslateHelper from "@Local/index";

const columns: GridColDef<TechnicianUser>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
    renderCell: (params) => {
      const row = params.row;
      const firstName = row.first_name;
      const lastName = row.last_name;
      const technicianDialog = useTechnicianDialog();
      return (
        <div className="grid-selectable" onClick={() => technicianDialog(row)}>
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: TranslateHelper.email(),
    width: 200,
  },
  {
    field: "phone",
    width: 150,
    headerName: TranslateHelper.phone(),
  },
  {
    field: "signing_authority",
    headerName: "Sign Authority",
    width: 150,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => {
      const row = params.row;
      const sign = row.signing_authority;
      return sign ? TranslateHelper.yes() : TranslateHelper.no();
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
    field: "region",
    headerName: TranslateHelper.region(),
    width: 150,
    valueGetter: (params) => {
      const row = params.row;
      const region = row?.technician_group?.group?.region;
      return region?.name;
    },
  },
  {
    field: "group",
    headerName: TranslateHelper.group(),
    width: 150,
    valueGetter: (params) => {
      const row = params.row;
      const group = row?.technician_group?.group;
      return group?.name;
    },
  },
  {
    field: "group_role",
    headerName: TranslateHelper.groupRole(),
    width: 150,
    valueGetter: (params) => {
      const row = params.row;
      const groupRole = row?.technician_group?.group_role;
      return groupRole?.name;
    },
  },
];

export default columns;
