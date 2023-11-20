import Job from "@Models/job/job";
import { store } from "@Store/index";
import { setJobId } from "@Store/job_store";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<Job>[] = [
  {
    field: "id",
    align: "right",
    headerAlign: "center",
    headerName: "ID",
    width: 40,
    renderCell: (params) => {
      const job = params.row;
      const jobId = job.id;
      return (
        <div
          className="grid-selectable"
          onClick={() => {
            store.dispatch(setJobId(jobId));
          }}
        >
          {jobId}
        </div>
      );
    },
  },
  {
    field: "unit_name",
    align: "center",
    headerAlign: "center",
    headerName: "Unit Name",
    width: 200,
    valueGetter: (params) => {
      const job = params.row;
      const unit = job.unit?.name;
      return unit;
    },
  },
  {
    field: "priority",
    align: "left",
    headerName: "Priority",
    width: 150,
    valueGetter: (params) => {
      const job = params.row;
      const priority = job.priority?.name;
      return priority;
    },
  },
  {
    field: "sub_type",
    align: "left",
    headerName: "Sub Type",
    width: 220,
    valueGetter: (params) => {
      const job = params.row;
      const subType = job.sub_type?.name;
      return subType;
    },
  },
  {
    field: "status",
    headerAlign: "left",
    align: "left",
    headerName: "Job Status",
    width: 200,
    valueGetter: (params) => {
      const job = params.row;
      const status = job.status?.name;
      return status;
    },
  },
  {
    field: "group",
    align: "center",
    headerName: "Group Name",
    width: 150,
    valueGetter: (params) => {
      const job = params.row;
      const group = job.unit?.group?.name;
      return group;
    },
  },
  {
    field: "region",
    align: "center",
    headerName: "Region Name",
    minWidth: 150,
    valueGetter: (params) => {
      const job = params.row;
      const region = job.unit?.group?.region?.name;
      return region;
    },
  },
  {
    field: "job_technicians",
    align: "center",
    headerAlign: "center",
    headerName: "Technicians",
    minWidth: 100,
    sortable: false,
    valueGetter: (params) => {
      const job = params.row;
      const technicians = job.job_technicians?.length;
      return technicians;
    },
  },
];

export default columns;
