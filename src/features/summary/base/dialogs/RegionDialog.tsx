import { Avatar, DialogContent, Grid, Typography } from "@mui/material";
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
import { useFormik } from "formik";
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
import { dateToFormat } from "@Utils/functions";

function RegionDialog() {
  /// Region store
  const { editRegion } = useSelector((state: RootState) => state.compay_region);
  const creatorDisplayName = `${editRegion?.creator?.first_name} ${editRegion?.creator?.last_name}`;

  /// Is edit or create dialog
  const isEdit = Boolean(editRegion);

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

  /// On changed action
  const onChangedAction = async (type: EActionType) => {
    if (type === EActionType.Delete) {
      const confirm = await openConfirm(
        "Delete Region",
        "Are you sure to delete reigon ?"
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
      <DialogCustomTitle title="Create Region" />
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
              label="Region Name"
              value={formik.values?.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              error={Boolean(formik.errors.name && formik.touched.name)}
            />
          </Grid>
          <Grid item xs={12}>
            <CountrySelect
              label="Country"
              fullWidth
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
              label="Street Address"
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
                  label="State"
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
                  label="City"
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
                  label="Zip Code"
                  value={formik.values?.zip_code}
                  onChange={formik.handleChange}
                  helperText={formik.touched.zip_code && formik.errors.zip_code}
                  error={Boolean(
                    formik.errors.zip_code && formik.touched.zip_code
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogCustomActions
        leading={{
          visibility: Boolean(editRegion),
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
                  children="test"
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
      />
    </>
  );
}

export default RegionDialog;
