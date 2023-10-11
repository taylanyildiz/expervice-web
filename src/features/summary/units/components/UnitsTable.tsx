import EmptyGrid from "@Components/EmptyGrid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function UnitsTable() {
  /// Columns
  const columns: GridColDef[] = [
    {
      field: "Id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "job",
      headerName: "Job Status",
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "qr_code",
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
    },
    {
      field: "unit_label",
      headerName: "Label",
    },
    {
      field: "unit_sub_type",
      headerName: "Type",
    },
    {
      field: "customer",
      headerName: "Customer",
    },
    {
      field: "group",
      headerName: "Group",
    },
    {
      field: "country",
      headerName: "Country",
    },
    {
      field: "state",
      headerName: "State",
    },
    {
      field: "city",
      headerName: "City",
    },
    {
      field: "street_address",
      headerName: "Street Address",
      width: 200,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      flex: 1,
      minWidth: 150,
    },
  ];

  return (
    <div className="units-grid">
      <DataGrid
        pagination
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns}
        rowCount={0}
        rows={[]}
        slots={{ noRowsOverlay: EmptyGrid }}
        sx={{ border: "none" }}
      />
    </div>
  );
}

export default UnitsTable;
