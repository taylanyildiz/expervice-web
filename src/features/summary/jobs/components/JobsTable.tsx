import Colors from "@Themes/colors";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function JobsTable() {
  /// Jobs columns
  const columns: GridColDef[] = [
    {
      field: "id",
      align: "right",
      headerName: "ID",
      width: 40,
    },
    {
      field: "unit_name",
      align: "center",
      headerName: "Unit Name",
      width: 150,
    },
    {
      field: "priority",
      align: "center",
      headerName: "Priority",
      width: 150,
    },
    {
      field: "sub_type",
      align: "center",
      headerName: "Sub Type",
      width: 150,
    },
    {
      field: "status",
      align: "center",
      headerName: "Job Status",
      width: 150,
    },
    {
      field: "group",
      align: "center",
      headerName: "Group Name",
      width: 150,
    },
    {
      field: "region",
      align: "center",
      headerName: "Region Name",
      flex: 1,
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
        rowCount={0}
        rows={[]}
        slots={{
          noRowsOverlay: EmptyGrid,
        }}
        sx={
          {
            // "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            //   borderRight: `1px solid #CBCBCB`,
            // },
          }
        }
      />
    </div>
  );
}

const EmptyGrid = () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    height="100%"
    flexGrow={1}
    sx={{ backgroundColor: "whtie" }}
  >
    <Grid item>
      <Typography children="Empty" />
    </Grid>
  </Grid>
);

export default JobsTable;
