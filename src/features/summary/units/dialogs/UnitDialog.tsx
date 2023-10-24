import { DialogCustomTitle } from "@Components/dialogs";
import { useUnit, useUnitCreate, useUnitUpdate } from "../helper/unit_helper";
import { Box, DialogContent, Typography } from "@mui/material";
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
import VisibilityComp from "@Components/VisibilityComp";
import Colors from "@Themes/colors";

function UnitDialog() {
  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

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

  /// Process unit
  const process = async (): Promise<Unit | null> => {
    const result = await openLoading(async () => {
      let result: Unit | null = null;
      if (!isEdit) result = await unitRepo.createUnit(createUnit!);
      else {
        if (info) {
          result = await unitRepo.updateUnit(info);
        }
        if (customer) {
          result = await unitRepo.updateUnitCustomer(unitId!, customer);
        }
        if (status) {
          result = await unitRepo.updateUnitStatus(unitId!);
        }
      }
      return result ?? unit;
    });
    return result;
  };

  /// Submit handle
  const onSubmitHandle = async () => {
    const result = await process();
    if (!result) return;
    switch (actionType) {
      case EActionType.Save:
        dispatch(setUnit(result));
        dispatch(setUnitId(result.id));
        break;
      case EActionType.SaveClose:
        closeDialog();
        break;
      case EActionType.SaveNew:
        formik.resetForm();
        dispatch(setUnit(null));
        dispatch(setUnitId(null));
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

  /// Unit create hook
  const createUnit = useUnitCreate(formik);

  /// Update unit hook
  const { anyUpdate, customer, info, status } = useUnitUpdate(unit, formik);

  /// Get Unit
  const getUnit = async () => {
    const result = openLoading(async () => {
      await unitRepo.getUnitById(unitId!);
    });
    if (!result) closeDialog();
  };

  /// Initialize
  useEffect(() => {
    if (!unitId) return;
    getUnit();
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
      unitRepo.getUnits();
    };
  }, []);

  return (
    <>
      <DialogCustomTitle title={title} />
      <VisibilityComp visibility={anyUpdate}>
        <Box pl={1} m={0} sx={{ backgroundColor: Colors.warning }}>
          <Typography
            fontSize={13}
            color="white"
            children="Plese click save to save changes"
          />
        </Box>
      </VisibilityComp>
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
