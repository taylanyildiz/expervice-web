import { DialogCustomTitle } from "@Components/dialogs";
import { useUnit } from "../helper/unit_helper";
import { Box, DialogContent } from "@mui/material";
import UnitDialogAction from "./UnitDialogAction";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { AppDispatch } from "@Store/index";
import { useDispatch } from "react-redux";
import { setUnit, setUnitId } from "@Store/unit_store";
import TabBar from "@Components/TabBar";
import UnitInformation from "./UnitInformation";
import { useFormik } from "formik";
import Unit, { defaultValue } from "@Models/units/unit";
import UnitRepository from "@Repo/unit_repository";
import { unitValidator } from "../validator/unit_validator";
import { useDialog } from "@Utils/hooks/dialog_hook";

function UnitDialog() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Unit Repository
  const unitRepo = new UnitRepository();

  /// Unit store
  const { unit, unitId } = useUnit();
  const isEdit = Boolean(unit);

  /// Title of dialog
  const title = isEdit ? "Unit Edit" : "Unit Create";

  /// Action type state
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Changed action type
  const onChangedAction = (type: EActionType) => {
    if (type === EActionType.Delete) {
      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = () => {
    switch (actionType) {
      case EActionType.Save:
        break;
      case EActionType.SaveClose:
        break;
      case EActionType.SaveNew:
        break;
    }
  };

  /// Formik
  const initialValues: Unit = defaultValue;
  const formik = useFormik({
    initialValues,
    validationSchema: unitValidator,
    onSubmit: onSubmitHandle,
  });

  /// Initialize
  useEffect(() => {
    if (!unitId) return;
    openLoading(async () => {
      await unitRepo.getUnitById(unitId);
    });
  }, [unitId]);

  /// Set formik
  useEffect(() => {
    if (!unit) return;
    for (let [k, v] of Object.entries(unit)) {
      formik.setFieldValue(k, v);
    }
  }, [unit]);

  /// Destroy
  useEffect(() => {
    return () => {
      dispatch(setUnitId(null));
      dispatch(setUnit(null));
    };
  }, []);

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <Box mt={1}>
          <TabBar
            tabs={["Unit Information"]}
            panels={[<UnitInformation formik={formik} />]}
          />
        </Box>
      </DialogContent>
      <UnitDialogAction onChanged={onChangedAction} />
    </>
  );
}

export default UnitDialog;
