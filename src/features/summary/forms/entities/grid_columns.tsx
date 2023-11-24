import Form from "@Models/form/form";
import { GridColDef } from "@mui/x-data-grid";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormRepository from "@Repo/form_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { openBase64PDF } from "@Utils/functions";
import { store } from "@Store/index";
import { setFormId } from "@Store/form_store";

const columns: GridColDef<Form>[] = [
  {
    field: "name",
    headerName: "Form Name",
    flex: 1,
    renderCell: (params) => {
      const form = params.row;
      const formId = form.id;
      const formName = form.name;
      return (
        <div
          className="grid-selectable"
          onClick={() => {
            store.dispatch(setFormId(formId));
          }}
        >
          {formName}
        </div>
      );
    },
  },
  {
    flex: 1,
    field: "customer_count",
    headerName: "Customer Count",
    sortable: false,
  },
  {
    flex: 1,
    field: "field_count",
    headerName: "Field Count",
    sortable: false,
  },
  {
    field: "pdf",
    sortable: false,
    renderHeader: () => {
      return <PictureAsPdfIcon color="error" />;
    },
    renderCell: (params) => {
      const id = params.row.id;
      const name = params.row.name;
      const { openLoading } = useDialog();
      const formRepository = new FormRepository();
      return (
        <Tooltip title={`Open ${name} PDF`}>
          <IconButton
            onClick={async () => {
              const result = await openLoading(async () => {
                return await formRepository.formPdf(id!);
              });
              if (!result) return;
              openBase64PDF(result);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      );
    },
  },
];

export default columns;
