import {
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import { ButtonProps } from "@mui/material";

const csvOptions: GridCsvExportOptions = {
  fileName: "customerDataBase",
  delimiter: ";",
  utf8WithBom: true,
};

function CustomExportButton(props: ButtonProps) {
  return (
    <GridToolbarExportContainer sx={{ justifyContent: "end" }} {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
    </GridToolbarExportContainer>
  );
}

function GrdiExportButton(props: GridToolbarContainerProps) {
  return (
    <GridToolbarContainer sx={{ justifyContent: "end" }} {...props}>
      <CustomExportButton />
    </GridToolbarContainer>
  );
}

export default GrdiExportButton;
