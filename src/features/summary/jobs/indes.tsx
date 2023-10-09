import JobsTable from "./components/JobsTable";
import "../../../assets/css/jobs.css";
import GridTableHeader from "@Components/GridTableHeader";

function JobsPage() {
  return (
    <div className="jobs-layout">
      <GridTableHeader
        title="Jobs"
        onAdd={() => {}}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <JobsTable />
    </div>
  );
}

export default JobsPage;
