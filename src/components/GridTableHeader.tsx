import { Grid, Typography } from "@mui/material";
import { PrimaryButton, VisibilityComp } from ".";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import Colors from "@Themes/colors";
import { ReactNode } from "react";
import TranslateHelper from "@Local/index";
import saveAs from "file-saver";

interface GridTableHeaderProps {
  title: string;
  onAdd: () => void;
  onFilter: () => void;
  onExport: () => any;
  filterCount?: number | string;
  more?: ReactNode[];
  visibilityAdd?: boolean;
}

function GridTableHeader(props: GridTableHeaderProps) {
  const { title, onAdd, onFilter, more, filterCount, visibilityAdd } = props;

  // const exportHandle = () => {
  //   const csv = onExport?.();
  //   if (!csv) return;
  //   const data = new Blob([csv], {
  //     type: "text/csv;charset=utf-8",
  //   });
  //   saveAs(data, "output.csv");
  // };

  return (
    <Grid p={2} container columnSpacing={1} alignItems="center">
      <Grid item flexGrow={1}>
        <Typography variant="h1" fontSize={20} children={title} />
      </Grid>
      {more?.map((e, i) => (
        <Grid key={`more-actions-${i}`} item children={e} />
      ))}
      {/* <Grid item>
        <PrimaryButton
          height={30}
          color="black"
          fontWeight="normal"
          fontSize={13}
          variant="outlined"
          border="1px solid grey"
          children={TranslateHelper.export()}
          onClick={exportHandle}
        />
      </Grid> */}
      <Grid item>
        <PrimaryButton
          height={30}
          color="black"
          fontWeight="normal"
          fontSize={13}
          variant="outlined"
          children={
            filterCount && filterCount != 0
              ? `${TranslateHelper.filter()} (${filterCount})`
              : TranslateHelper.filter()
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
            children={TranslateHelper.add()}
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
