import JobsTable from "./components/JobsTable";
import "../../../assets/css/jobs.css";
import { Grid, Typography } from "@mui/material";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

function JobsPage() {
  return (
    <div className="jobs-layout">
      <Grid container columnSpacing={1}>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={20} children="Jobs" />
        </Grid>
        <Grid item>
          <PrimaryButton
            height={30}
            color="black"
            fontWeight="normal"
            fontSize={13}
            variant="outlined"
            children="Export"
            border="1px solid grey"
          />
        </Grid>
        <Grid item>
          <PrimaryButton
            height={30}
            color="black"
            fontWeight="normal"
            fontSize={13}
            variant="outlined"
            children="Filter"
            border="1px solid grey"
            suffix={<FilterAltIcon />}
          />
        </Grid>
        <Grid item>
          <PrimaryButton
            height={30}
            color="white"
            fontWeight="normal"
            fontSize={13}
            variant="contained"
            children="Add"
            backgroundColor={Colors.primaryLight}
            suffix={<AddIcon />}
          />
        </Grid>
      </Grid>
      <JobsTable />
    </div>
  );
}

export default JobsPage;
