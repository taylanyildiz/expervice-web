import { useJobDialog } from "@Features/summary/jobs/helper/job_helper";
import TranslateHelper from "@Local/index";
import JobTechnician from "@Models/job/job_technician";
import { store } from "@Store/index";
import { dateRange, dateToFormat } from "@Utils/functions";
import { GridColDef } from "@mui/x-data-grid";

const technicianJobsColumns = (): GridColDef<JobTechnician>[] => [
  {
    field: "id",
    headerName: "ID",
    renderCell: (params) => {
      const job = params.row.job;
      const { openJobDialog } = useJobDialog();
      return (
        <div
          className="grid-selectable"
          onClick={() => {
            openJobDialog({ id: job?.id });
          }}
        >
          {job?.id}
        </div>
      );
    },
  },
  {
    field: "unit_name",
    minWidth: 200,
    headerName: TranslateHelper.unitName(),
    valueGetter: (params) => {
      return params.row.job?.unit?.name;
    },
  },
  {
    field: "job_priority",
    minWidth: 200,
    headerName: TranslateHelper.jobPriority(),
    valueGetter: (params) => {
      const lng = store.getState().user.language?.language_code ?? "en";
      return params.row.job?.priority?.translations?.name?.[lng];
    },
  },
  {
    field: "job_status",
    minWidth: 200,
    headerName: TranslateHelper.jobStatus(),
    valueGetter: (params) => {
      const lng = store.getState().user.language?.language_code ?? "en";
      return params.row.job?.status?.translations?.name?.[lng];
    },
  },
  {
    field: "job_role",
    minWidth: 200,
    headerName: TranslateHelper.jobRole(),
    valueGetter: (params) => {
      const lng = store.getState().user.language?.language_code ?? "en";
      return params.row.job_role?.translations?.name?.[lng];
    },
  },
  {
    field: "group",
    minWidth: 200,
    headerName: TranslateHelper.groupName(),
    valueGetter: (params) => {
      return params.row.job?.unit?.group?.name;
    },
  },
  {
    field: "region",
    minWidth: 200,
    headerName: TranslateHelper.regionName(),
    valueGetter: (params) => {
      return params.row.job?.unit?.group?.region?.name;
    },
  },
  {
    field: "creted_at",
    minWidth: 200,
    headerName: TranslateHelper.createdDate(),
    valueGetter: (params) => {
      const date = new Date(params.row.job?.created_at!);
      return dateToFormat(date);
    },
  },
  {
    field: "updated_at",
    minWidth: 200,
    headerName: TranslateHelper.lastUpdatedDate(),
    valueGetter: (params) => {
      const date = new Date(params.row.job?.updated_at!);
      return dateToFormat(date);
    },
  },
  {
    field: "elapsed_at",
    minWidth: 200,
    headerName: TranslateHelper.elapsedDuration(),
    valueGetter: (params) => {
      const created = new Date(params.row.job?.created_at!);
      const updated = new Date(params.row.job?.updated_at!);
      return dateRange(created, updated);
    },
  },
];

export default technicianJobsColumns;
