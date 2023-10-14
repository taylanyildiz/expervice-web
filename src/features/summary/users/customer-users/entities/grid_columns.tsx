import Customer from "@Models/customer/customer";
import { GridColDef } from "@mui/x-data-grid";
import { useCustomerDialog } from "../helpers/customer_user_helper";
import StatusBox from "@Components/StatusBox";

const columns: GridColDef<Customer>[] = [
  {
    field: "display_name",
    headerName: "Display Name",
    width: 200,
    renderCell: (params) => {
      const row = params.row;
      const displayName = row.display_name;
      const openDialog = useCustomerDialog();
      return (
        <p className="grid-selectable" onClick={() => openDialog(row)}>
          {displayName}
        </p>
      );
    },
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
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
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "cell_phone",
    headerName: "Cell Phone",
    width: 200,
  },
  {
    field: "street_address",
    headerName: "Street Address",
    width: 200,
  },
  {
    field: "zip_code",
    headerName: "Zip Code",
    width: 200,
  },
  {
    field: "state",
    headerName: "State",
    valueGetter: (params) => {
      const row = params.row;
      return row.state?.name;
    },
  },
  {
    field: "city",
    headerName: "City",
    valueGetter: (params) => {
      const row = params.row;
      return row.city?.name;
    },
  },
  {
    field: "country",
    headerName: "Country",
    valueGetter: (params) => {
      const row = params.row;
      return row.country?.name;
    },
  },
];

export default columns;
