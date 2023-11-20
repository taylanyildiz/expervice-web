import Unit from "@Models/units/unit";
import { GridColDef } from "@mui/x-data-grid";
import UnitLabelBox from "@Components/UnitLabelBox";
import JobTypeBox from "@Components/JobTypeBox";
import { useUnitDialog } from "@Features/summary/units/helper/unit_helper";
import { useCustomer } from "../helpers/customer_user_helper";

/// Columns
const customerUnitColumns: GridColDef<Unit>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 160,
    renderCell: (params) => {
      const row = params.row;
      const { openUnitDialog } = useUnitDialog();
      const { customer } = useCustomer();
      return (
        <p
          className="grid-selectable"
          onClick={() => {
            openUnitDialog(row.id, { customer });
          }}
        >
          {row.name}
        </p>
      );
    },
  },
  {
    field: "job",
    headerName: "Job Status",
    width: 150,
    renderCell: (params) => {
      const job = params.row.job;
      return <JobTypeBox type={job?.type_id} />;
    },
  },

  {
    field: "status",
    headerName: "Status",
    valueGetter: (params) => {
      const status = params.row.status;
      return status ? "Active" : "Not Active";
    },
  },
  {
    field: "qr_code",
    width: 150,
    headerName: "QR Code",
  },
  {
    field: "identity_number",
    headerName: "Identity Number",
    width: 200,
  },
  {
    field: "imei",
    headerName: "IMEI",
    width: 150,
  },
  {
    field: "unit_label",
    headerName: "Label",
    renderCell: (params) => {
      const row = params.row;
      const label = row.unit_label;
      return <UnitLabelBox label={label!} />;
    },
  },
  {
    field: "unit_sub_type",
    headerName: "Type",
    width: 250,
    valueGetter: (params) => {
      const row = params.row;
      const subType = row.unit_sub_type;
      const type = subType?.unit_type;
      return `${subType?.name} / ${type?.name}`;
    },
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 200,
    valueGetter: (params) => {
      const row = params.row;
      const customer = row.customer;
      return customer?.display_name;
    },
  },
  {
    field: "group",
    headerName: "Group",
    width: 150,
    valueGetter: (params) => {
      const row = params.row;
      const group = row.group;
      return group?.name;
    },
  },
  {
    field: "street_address",
    headerName: "Street Address",
    width: 200,
  },
  {
    field: "state",
    headerName: "State",
    valueGetter: (params) => {
      const row = params.row;
      const state = row.state;
      return state?.name;
    },
  },
  {
    field: "city",
    headerName: "City",
    valueGetter: (params) => {
      const row = params.row;
      const city = row.city;
      return city?.name;
    },
  },
  {
    field: "country",
    headerName: "Country",
    valueGetter: (params) => {
      const row = params.row;
      const country = row.country;
      return country?.name;
    },
  },
];

export default customerUnitColumns;