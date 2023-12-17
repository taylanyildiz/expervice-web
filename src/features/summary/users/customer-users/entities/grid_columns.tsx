import Customer from "@Models/customer/customer";
import { GridColDef } from "@mui/x-data-grid";
import { useCustomerDialog } from "../helpers/customer_user_helper";
import StatusBox from "@Components/StatusBox";
import TranslateHelper from "@Local/index";
import { store } from "@Store/index";

const columns = (): GridColDef<Customer>[] => [
  {
    field: "display_name",
    headerName: TranslateHelper.displayName(),
    width: 200,
    renderCell: (params) => {
      const row = params.row;
      const displayName = row.display_name;
      const { openCustomerDialog } = useCustomerDialog();
      return (
        <p className="grid-selectable" onClick={() => openCustomerDialog(row)}>
          {displayName}
        </p>
      );
    },
  },
  {
    field: "first_name",
    headerName: TranslateHelper.firstName(),
    width: 200,
  },
  {
    field: "last_name",
    headerName: TranslateHelper.lastName(),
    width: 200,
  },
  {
    field: "email",
    headerName: TranslateHelper.email(),
    width: 250,
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
    field: "phone",
    headerName: TranslateHelper.phone(),
    width: 200,
  },
  {
    field: "cell_phone",
    headerName: TranslateHelper.cellPhone(),
    width: 200,
  },
  {
    field: "street_address",
    headerName: TranslateHelper.streetAddress(),
    width: 200,
  },
  {
    field: "zip_code",
    headerName: TranslateHelper.zipCode(),
    width: 200,
  },
  {
    field: "state",
    headerName: TranslateHelper.state(),
    valueGetter: (params) => {
      const row = params.row;
      return row.state?.name;
    },
  },
  {
    field: "city",
    headerName: TranslateHelper.city(),
    valueGetter: (params) => {
      const row = params.row;
      return row.city?.name;
    },
  },
  {
    field: "country",
    headerName: TranslateHelper.country(),
    valueGetter: (params) => {
      const row = params.row;
      const lng = store.getState().user.language?.language_code ?? "en";
      const country = row.country;
      return country?.translations?.[lng];
    },
  },
];

export default columns;
