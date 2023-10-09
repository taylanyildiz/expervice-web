import { Grid, Typography } from "@mui/material";
import { PrimaryButton } from ".";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import Colors from "@Themes/colors";

interface GridTableHeaderProps {
  title: string;
  onAdd: () => void;
  onFilter: () => void;
  onExport: () => void;
}

function GridTableHeader(props: GridTableHeaderProps) {
  const { title, onAdd, onFilter, onExport } = props;

  return (
    <Grid p={2} container columnSpacing={1}>
      <Grid item flexGrow={1}>
        <Typography variant="h1" fontSize={20} children={title} />
      </Grid>
      <Grid item>
        <PrimaryButton
          height={30}
          color="black"
          fontWeight="normal"
          fontSize={13}
          variant="outlined"
          border="1px solid grey"
          children="Export"
          onClick={onExport}
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
          onClick={onFilter}
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
          onClick={onAdd}
        />
      </Grid>
    </Grid>
  );
}

export default GridTableHeader;
