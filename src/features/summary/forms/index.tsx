import GridTableHeader from "@Components/GridTableHeader";
import FormsTable from "./components/FormsTable";
import { useForm, useFormDialog } from "./helper/form_helper";
import { useEffect } from "react";
import { useQuery } from "@Utils/functions";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import {
  setFormDialogStatus,
  setFormFilterDrawerStatus,
  setFormId,
} from "@Store/form_store";
import TranslateHelper from "@Local/index";
import "../../../assets/css/forms.css";
import FormFilterDrawer from "./components/FormFilterDrawer";

function FormsPage() {
  /// Form store
  const { formId, filterCount } = useForm();

  /// Form dialog hook
  const { openFormDialog, closeDialog } = useFormDialog();

  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Listen query params
  useEffect(() => {
    const id = parseInt(`${path.get("formId")}`);
    dispatch(setFormId(null));
    dispatch(setFormDialogStatus(false));
    if (!id || isNaN(id)) deletePath("formId");
    if (id || !isNaN(id)) dispatch(setFormId(id));
  }, []);

  /// Listen form id
  useEffect(() => {
    if (formId) {
      setPath("formId", formId.toString());
      return openFormDialog();
    }
    deletePath("formId");
    dispatch(setFormDialogStatus(false));
    closeDialog();
  }, [formId]);

  return (
    <div className="forms-layout">
      <GridTableHeader
        title={TranslateHelper.forms()}
        onAdd={() => {
          openFormDialog();
        }}
        onFilter={() => {
          dispatch(setFormFilterDrawerStatus(true));
        }}
        onExport={() => {}}
        filterCount={filterCount}
      />
      <FormsTable />
      <FormFilterDrawer />
    </div>
  );
}

export default FormsPage;
