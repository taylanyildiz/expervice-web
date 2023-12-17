import TranslateHelper from "@Local/index";
import Job from "@Models/job/job";
import { store } from "@Store/index";
import { setJobId } from "@Store/job_store";
import { dateToFormat } from "@Utils/functions";
import { GridColDef } from "@mui/x-data-grid";

const columns = (): GridColDef<Job>[] => [
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
    headerName: TranslateHelper.unitName(),
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
    headerName: TranslateHelper.priority(),
    width: 150,
    valueGetter: (params) => {
      const job = params.row;
      const lng = store.getState().user.language?.language_code ?? "en";
      const priority = job.priority?.translations?.name?.[lng];
      return priority;
    },
  },
  {
    field: "sub_type",
    align: "left",
    headerName: TranslateHelper.subType(),
    width: 220,
    valueGetter: (params) => {
      const job = params.row;
      const lng = store.getState().user.language?.language_code ?? "en";
      const subType = job.sub_type?.translations?.name?.[lng];
      return subType;
    },
  },
  {
    field: "status",
    headerAlign: "left",
    align: "left",
    headerName: TranslateHelper.jobStatus(),
    width: 200,
    valueGetter: (params) => {
      const job = params.row;
      const lng = store.getState().user.language?.language_code ?? "en";
      const status = job.status?.translations?.name?.[lng];
      return status;
    },
  },
  {
    field: "group",
    align: "center",
    headerName: TranslateHelper.groupName(),
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
    headerName: TranslateHelper.regionName(),
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
    headerName: TranslateHelper.technicians(),
    minWidth: 100,
    flex: 1,
    sortable: false,
    valueGetter: (params) => {
      const job = params.row;
      const technicians = job.job_technicians?.length;
      return technicians;
    },
  },
  {
    field: "creted_at",
    minWidth: 200,
    headerName: TranslateHelper.createdDate(),
    valueGetter: (params) => {
      const date = new Date(params.row.created_at!);
      return dateToFormat(date);
    },
  },
];

export default columns;
