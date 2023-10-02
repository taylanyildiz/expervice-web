import { DataGrid, GridColDef } from "@mui/x-data-grid";

function JobsTable() {
  /// Jobs columns
  const columns: GridColDef[] = [
    {
      field: "id",
      align: "right",
      headerName: "ID",
    },
    {
      field: "unit_name",
      align: "center",
      headerName: "Unit Name",
      width: 200,
    },
    {
      field: "priority",
      align: "center",
      headerName: "Priority",
    },
    {
      field: "sub_type",
      align: "center",
      headerName: "Sub Type",
    },
    {
      field: "status",
      align: "center",
      headerName: "Job Status",
    },
    {
      field: "group",
      align: "center",
      headerName: "Group Name",
    },
    {
      field: "region",
      align: "center",
      headerName: "Region Name",
    },
  ];

  return (
    <div className="jobs-grid">
      <DataGrid
        pagination
        disableColumnMenu
        sortingMode="server"
        paginationMode="server"
        columns={columns}
        rows={[]}
        sx={{
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: `1px solid #CBCBCB`,
          },
        }}
      />
    </div>
  );
}

export default JobsTable;
