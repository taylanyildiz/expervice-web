import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import VisibilityComp from "@Components/VisibilityComp";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { setEditGroup } from "@Store/company_region_store";
import { AppDispatch, RootState } from "@Store/index";
import { caption, dateToFormat } from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Avatar, DialogContent, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";

function GroupDialog() {
  /// Company region store
  const { editGroup } = useSelector((state: RootState) => state.compay_region);
  const creatorDisplayName = `${editGroup?.creator?.first_name} ${editGroup?.creator?.last_name}`;

  /// Is edit dialog depends on [editGroup]
  const isEdit = Boolean(editGroup);

  /// Title of dialog
  const title = isEdit ? "Group Edit" : "Group Create";

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Actions type
  const [action, setAction] = useState<EActionType | null>(null);

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Region repository
  const companyRegionRepo = new CompanyRegionRepository();

  /// Process
  const process = async (values: { name: string }) => {
    const result = await openLoading(async () => {
      if (!isEdit) return await companyRegionRepo.createGroup(values.name);
      return await companyRegionRepo.updateGroup(values.name);
    });
    return result;
  };

  /// Submit handle
  const onSubmitHandle = async (values: { name: string }) => {
    const result = await process(values);
    if (!result) return;
    switch (action) {
      case EActionType.Save:
        dispatch(setEditGroup(result));
        break;
      case EActionType.SaveNew:
        dispatch(setEditGroup(null));
        formik.resetForm();
        break;
      case EActionType.SaveClose:
        dispatch(setEditGroup(null));
        closeDialog();
        break;
    }
  };

  /// Formik
  const initialValues = { name: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      name: string().required().min(2, "Invalid name"),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Actions changed
  const onChangedAction = async (action: EActionType) => {
    if (action === EActionType.Delete) {
      const confirm = await openConfirm(
        "Delete Group",
        "Are you sure to delete group ?"
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return companyRegionRepo.deleteGroup(editGroup!.id!);
        });
        if (result) closeDialog();
      }
      return;
    }
    formik.handleSubmit();
    setAction(action);
  };

  /// Set formik values
  const setValues = () => {
    if (!isEdit) return;
    for (let [k, v] of Object.entries(editGroup!)) {
      formik.setFieldValue(k, v);
    }
  };

  /// Initialize component
  useEffect(() => {
    setValues();
  }, [editGroup]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setEditGroup(null));
    };
  }, []);

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <Grid
          container
          p={2}
          mt={1}
          sx={{ borderRadius: 1, backgroundColor: "white" }}
        >
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="name"
              label="Group Name"
              value={formik.values?.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              error={Boolean(formik.errors.name && formik.touched.name)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <VisibilityComp
            visibility={isEdit}
            children={
              <PrimaryButton
                height={30}
                fontWeight="normal"
                color="black"
                children="Delete"
                variant="outlined"
                onClick={() => onChangedAction(EActionType.Delete)}
              />
            }
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save"
            onClick={() => onChangedAction(EActionType.Save)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & New"
            onClick={() => onChangedAction(EActionType.SaveNew)}
          />,
          <PrimaryButton
            height={30}
            fontWeight="normal"
            color="white"
            children="Save & Close"
            onClick={() => onChangedAction(EActionType.SaveClose)}
          />,
        ]}
        leading={{
          visibility: isEdit,
          children: (
            <Grid container alignItems="center" columnSpacing={1}>
              <Grid item>
                <Typography
                  variant="body1"
                  fontSize={12}
                  color="grey"
                  children={`Created by ${creatorDisplayName}`}
                />
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    height: 30,
                    width: 30,
                    fontSize: 12,
                    color: "white",
                    backgroundColor: "grey",
                  }}
                  children={caption(creatorDisplayName)}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  fontSize={12}
                  color="grey"
                  children={dateToFormat(editGroup?.created_at)}
                />
              </Grid>
            </Grid>
          ),
        }}
      />
    </>
  );
}

export default GroupDialog;
