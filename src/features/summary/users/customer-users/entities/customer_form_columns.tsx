import { GridColDef } from "@mui/x-data-grid";
import FormCustomer from "@Models/form/form_customer";
import { IconButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TranslateHelper from "@Local/index";

const customerFormColumns = (props: {
  onPDF: (id: number) => void;
  onDelete: (id: number) => void;
}): GridColDef<FormCustomer>[] => [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "job_sub_type",
    headerName: TranslateHelper.jobSubType(),
    valueGetter: (params) => params.row.job_sub_type?.name,
    flex: 1,
  },
  {
    field: "unit_sub_type",
    headerName: TranslateHelper.unitSubType(),
    valueGetter: (params) => params.row.unit_sub_type?.name,
    flex: 1,
  },
  {
    field: "current_job_status",
    headerName: TranslateHelper.currentJobStatus(),
    valueGetter: (params) => params.row.current_job_status?.name,
    flex: 1,
  },
  {
    field: "next_job_status",
    headerName: TranslateHelper.nextJobStatus(),
    valueGetter: (params) => params.row.next_job_status?.name,
    flex: 1,
  },
  {
    field: "",
    headerName: "",
    sortable: false,
    renderCell: (params) => {
      return (
        <Stack spacing={1} direction="row">
          <IconButton onClick={() => props.onPDF(params.row.id!)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => props.onDelete(params.row.id!)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

export default customerFormColumns;
