import GridTableHeader from "@Components/GridTableHeader";
import FormsTable from "./components/FormsTable";
import "../../../assets/css/forms.css";
import { Outlet } from "react-router-dom";
import { useForm, useFormDialog } from "./helper/form_helper";
import { useEffect } from "react";
import { useQuery } from "@Utils/functions";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setFormId } from "@Store/form_store";

function FormsPage() {
  /// Form store
  const { formId } = useForm();

  /// Form dialog hook
  const { openDilaog, closeDialog } = useFormDialog();

  /// Query hook
  const [path, deletePath, setPath] = useQuery();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Listen query params
  useEffect(() => {
    const id = parseInt(`${path.get("formId")}`);
    if (!id || isNaN(id)) {
      deletePath("formId");
      dispatch(setFormId(null));
    }
    if (id || !isNaN(id)) {
      dispatch(setFormId(id));
    }
  }, []);

  /// Listen form id
  useEffect(() => {
    if (formId) {
      setPath("formId", formId.toString());
      return openDilaog();
    }
    deletePath("formId");
    closeDialog();
  }, [formId]);

  return (
    <div className="forms-layout">
      <GridTableHeader
        title="Forms"
        onAdd={() => {
          openDilaog();
        }}
        onFilter={() => {}}
        onExport={() => {}}
      />
      <FormsTable />
      <Outlet />
    </div>
  );
}

export default FormsPage;
