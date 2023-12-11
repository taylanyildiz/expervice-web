import { Avatar, Box, DialogContent, Grid, Typography } from "@mui/material";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  PrimaryButton,
  TextOutlineField,
  DialogCustomActions,
  DialogCustomTitle,
  VisibilityComp,
} from "@Components/index";
import { FormikProps, useFormik } from "formik";
import { City, CompanyRegion, Country, State } from "@Models/index";
import regionValidator from "../validator/region_validator";
import RegionProcess from "../entities/region_process";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useEffect, useState } from "react";
import { useDialog } from "@Utils/hooks/dialog_hook";
import CompanyRegionRepository from "@Repo/company_region_repository";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@Store/index";
import { setEditRegion } from "@Store/company_region_store";
import { caption, dateToFormat } from "@Utils/functions";
import TranslateHelper from "@Local/index";

function RegionContent(props: { formik: FormikProps<CompanyRegion> }) {
  const { formik } = props;

  /// Select country
  const onChangedCountryHandle = (country?: Country | null) => {
    formik.setFieldValue("country", country);
  };

  /// Select country
  const onChangedStateHandle = (state?: State | null) => {
    formik.setFieldValue("state", state);
  };

  /// Select country
  const onChangedCityHandle = (city?: City | null) => {
    formik.setFieldValue("city", city);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="name"
          label={TranslateHelper.regionName()}
          value={formik.values?.name}
          onChange={formik.handleChange}
          helperText={formik.touched.name && formik.errors.name}
          error={Boolean(formik.errors.name && formik.touched.name)}
        />
      </Grid>
      <Grid item xs={12}>
        <CountrySelect
          fullWidth
          label={TranslateHelper.country()}
          value={formik.values?.country}
          onChanged={onChangedCountryHandle}
          helperText={formik.touched.country && formik.errors.country}
          error={Boolean(formik.errors.country && formik.touched.country)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="street_address"
          label={TranslateHelper.streetAddress()}
          value={formik.values?.street_address}
          onChange={formik.handleChange}
          helperText={
            formik.touched.street_address && formik.errors.street_address
          }
          error={Boolean(
            formik.errors.street_address && formik.touched.street_address
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={1}>
          <Grid item xs={5}>
            <StateSelect
              fullWidth
              label={TranslateHelper.state()}
              countryId={formik.values.country?.id}
              value={formik.values?.state}
              onChanged={onChangedStateHandle}
              helperText={formik.touched.state && formik.errors.state}
              error={Boolean(formik.errors.state && formik.touched.state)}
            />
          </Grid>
          <Grid item xs={4}>
            <CitySelect
              fullWidth
              label={TranslateHelper.city()}
              stateId={formik.values.state?.id}
              value={formik.values?.city}
              onChanged={onChangedCityHandle}
              helperText={formik.touched.city && formik.errors.city}
              error={Boolean(formik.errors.city && formik.touched.city)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutlineField
              fullWidth
              name="zip_code"
              label={TranslateHelper.zipCode()}
              value={formik.values?.zip_code}
              onChange={formik.handleChange}
              helperText={formik.touched.zip_code && formik.errors.zip_code}
              error={Boolean(formik.errors.zip_code && formik.touched.zip_code)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function RegionActions(props: { onChanged: (type: EActionType) => void }) {
  const { onChanged } = props;
  const { editRegion } = useSelector((state: RootState) => state.companyRegion);
  const creatorDisplayName = `${editRegion?.creator?.first_name} ${editRegion?.creator?.last_name}`;
  const isEdit = Boolean(editRegion);

  return (
    <DialogCustomActions
      leading={{
        visibility: isEdit,
        children: (
          <Grid container alignItems="center" columnSpacing={1}>
            <Grid item>
              <Typography
                variant="body1"
                fontSize={12}
                color="grey"
                children={TranslateHelper.createdBy({
                  name: creatorDisplayName,
                })}
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
                children={dateToFormat(editRegion?.created_at)}
              />
            </Grid>
          </Grid>
        ),
      }}
      actions={[
        <VisibilityComp
          visibility={isEdit}
          children={
            <PrimaryButton
              height={30}
              fontWeight="normal"
              color="black"
              children={TranslateHelper.delete()}
              variant="outlined"
              onClick={() => onChanged(EActionType.Delete)}
            />
          }
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.save()}
          onClick={() => onChanged(EActionType.Save)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveNew()}
          onClick={() => onChanged(EActionType.SaveNew)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveClose()}
          onClick={() => onChanged(EActionType.SaveClose)}
        />,
      ]}
    />
  );
}

function RegionDialog() {
  /// Region store
  const { editRegion } = useSelector((state: RootState) => state.companyRegion);

  /// Is edit or create dialog
  const isEdit = Boolean(editRegion);

  /// Dialog title depends on [isEdit]
  const title = isEdit
    ? TranslateHelper.regionEdit()
    : TranslateHelper.regionCreate();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Dialog hooks
  const { openLoading, closeDialog, openConfirm } = useDialog();

  /// Click action type
  const [actionType, setActionType] = useState<EActionType | null>(null);

  /// Company region repo
  const companyRegionRepo = new CompanyRegionRepository();

  /// Process
  const process = async (v: RegionProcess): Promise<CompanyRegion | null> => {
    const result = await openLoading(async () => {
      if (!isEdit) return await companyRegionRepo.createRegion(v);
      return await companyRegionRepo.updateRegion({ ...v, id: editRegion?.id });
    });
    if (!result) return null;
    return result;
  };

  /// Submit handle
  const onSubmitHandle = async (values: CompanyRegion) => {
    const model: RegionProcess = {
      name: values.name!,
      country_id: values.country!.id!,
      state_id: values.state!.id!,
      city_id: values.city!.id!,
      street_address: values.street_address!,
      zip_code: values.zip_code!,
    };
    const result: CompanyRegion | null = await process(model);
    if (!result) return;
    switch (actionType) {
      case EActionType.Save:
        dispatch(setEditRegion(result));
        break;
      case EActionType.SaveClose:
        dispatch(setEditRegion(null));
        closeDialog();
        break;
      case EActionType.SaveNew:
        dispatch(setEditRegion(null));
        formik.resetForm();
        break;
    }
  };

  /// Formik
  const initialValues: CompanyRegion = {
    name: "",
    zip_code: "",
    street_address: "",
    country: undefined,
    state: undefined,
    city: undefined,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: regionValidator,
    onSubmit: onSubmitHandle,
  });

  /// Set values of formik
  const setValues = () => {
    if (!editRegion) return;
    for (let [k, v] of Object.entries(editRegion)) {
      formik.setFieldValue(k, v);
    }
  };

  /// Initialize component
  useEffect(() => {
    setValues();
  }, [editRegion]);

  /// Destroy component
  useEffect(() => {
    return () => {
      dispatch(setEditRegion(null));
    };
  }, []);

  /// On changed action
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        TranslateHelper.deleteRegion(),
        TranslateHelper.sureDeleteRegion()
      );
      if (confirm) {
        const result = await openLoading(async () => {
          return await companyRegionRepo.deleteRegion(editRegion!.id!);
        });
        if (result) {
          closeDialog();
        }
      }

      return;
    }
    setActionType(type);
    formik.handleSubmit();
  };

  return (
    <>
      <DialogCustomTitle title={title} />
      <DialogContent>
        <Box mt={1} sx={{ backgroundColor: "white", p: 1 }}>
          <RegionContent formik={formik} />
        </Box>
      </DialogContent>
      <RegionActions onChanged={onChangedAction} />
    </>
  );
}

export default RegionDialog;
