import Unit from "@Models/units/unit";
import { GridColDef } from "@mui/x-data-grid";
import UnitLabelBox from "@Components/UnitLabelBox";
import JobTypeBox from "@Components/JobTypeBox";
import { useUnitDialog } from "@Features/summary/units/helper/unit_helper";
import { useCustomer } from "../helpers/customer_user_helper";
import TranslateHelper from "@Local/index";

/// Columns
const customerUnitColumns = (): GridColDef<Unit>[] => [
  {
    field: "name",
    headerName: TranslateHelper.name(),
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
    headerName: TranslateHelper.jobStatus(),
    width: 150,
    renderCell: (params) => {
      const job = params.row.job;
      return <JobTypeBox type={job?.type_id} />;
    },
  },

  {
    field: "status",
    headerName: TranslateHelper.status(),
    valueGetter: (params) => {
      const status = params.row.status;
      return status ? "Active" : "Not Active";
    },
  },
  {
    field: "qr_code",
    headerName: TranslateHelper.qrCode(),
    width: 150,
  },
  {
    field: "identity_number",
    headerName: TranslateHelper.identityNumber(),
    width: 200,
  },
  {
    field: "imei",
    headerName: TranslateHelper.imei(),
    width: 150,
  },
  {
    field: "unit_label",
    headerName: TranslateHelper.unitLabel(),
    renderCell: (params) => {
      const row = params.row;
      const label = row.unit_label;
      return <UnitLabelBox label={label!} />;
    },
  },
  {
    field: "unit_sub_type",
    headerName: TranslateHelper.unitType(),
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
    headerName: TranslateHelper.customer(),
    width: 200,
    valueGetter: (params) => {
      const row = params.row;
      const customer = row.customer;
      return customer?.display_name;
    },
  },
  {
    field: "group",
    headerName: TranslateHelper.group(),
    width: 150,
    valueGetter: (params) => {
      const row = params.row;
      const group = row.group;
      return group?.name;
    },
  },
  {
    field: "street_address",
    headerName: TranslateHelper.streetAddress(),
    width: 200,
  },
  {
    field: "state",
    headerName: TranslateHelper.state(),
    valueGetter: (params) => {
      const row = params.row;
      const state = row.state;
      return state?.name;
    },
  },
  {
    field: "city",
    headerName: TranslateHelper.city(),
    valueGetter: (params) => {
      const row = params.row;
      const city = row.city;
      return city?.name;
    },
  },
  {
    field: "country",
    headerName: TranslateHelper.country(),
    valueGetter: (params) => {
      const row = params.row;
      const country = row.country;
      return country?.name;
    },
  },
];

export default customerUnitColumns;
