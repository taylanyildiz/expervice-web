import { Grid, Typography } from "@mui/material";
import { PrimaryButton, VisibilityComp } from ".";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import Colors from "@Themes/colors";
import { ReactNode } from "react";

interface GridTableHeaderProps {
  title: string;
  onAdd: () => void;
  onFilter: () => void;
  onExport: () => void;
  filterCount?: number | string;
  more?: ReactNode[];
  visibilityAdd?: boolean;
}

function GridTableHeader(props: GridTableHeaderProps) {
  const { title, onAdd, onFilter, onExport, more, filterCount, visibilityAdd } =
    props;

  return (
    <Grid p={2} container columnSpacing={1} alignItems="center">
      <Grid item flexGrow={1}>
        <Typography variant="h1" fontSize={20} children={title} />
      </Grid>
      {more?.map((e, i) => (
        <Grid key={`more-actions-${i}`} item children={e} />
      ))}
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
          children={
            filterCount && filterCount != 0
              ? `Filter (${filterCount})`
              : "Filter"
          }
          border="1px solid grey"
          suffix={<FilterAltIcon />}
          onClick={onFilter}
        />
      </Grid>
      <VisibilityComp visibility={visibilityAdd ?? true}>
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
      </VisibilityComp>
    </Grid>
  );
}

export default GridTableHeader;
