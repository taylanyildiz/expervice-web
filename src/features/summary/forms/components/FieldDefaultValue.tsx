import TextOutlineField from "@Components/TextOutlineField";
import Field from "@Models/form/field";
import { FormikErrors, FormikProps, FormikTouched } from "formik";
import { EFormFielType } from "../entities/form_enums";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TranslateHelper from "@Local/index";

interface FieldDefaultValueProps {
  formik: FormikProps<Field>;
}

function FieldDefaultValue(props: FieldDefaultValueProps) {
  const { formik } = props;
  const type = formik.values.field_type_id;

  const optionError = formik.errors.options as FormikErrors<{
    label?: string;
  }>[];
  const optionTouch = formik.touched.options as FormikTouched<{
    label?: string;
  }>[];

  switch (type) {
    case EFormFielType.TextFormField:
      return (
        <TextOutlineField
          fullWidth
          label={TranslateHelper.defaultValue()}
          name="default_value"
          helperText={
            formik.touched.default_value && formik.errors.default_value
          }
          error={Boolean(
            formik.touched.default_value && formik.errors.default_value
          )}
          onChange={formik.handleChange}
          value={formik.values.default_value}
        />
      );
    case EFormFielType.CheckBox:
      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              fontSize={13}
              children={TranslateHelper.defaultValue()}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label={"True"}
              checked={formik.values.default_value === "true"}
              onChange={(_) => formik.setFieldValue("default_value", "true")}
              control={<Checkbox size="small" />}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label={"False"}
              checked={(formik.values.default_value ?? "false") === "false"}
              onChange={(_) => formik.setFieldValue("default_value", "false")}
              control={<Checkbox size="small" />}
            />
          </Grid>
        </Grid>
      );
    case EFormFielType.DropDown:
      return (
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              options={formik.values.options?.map((e) => e.label ?? "") ?? []}
              value={formik.values.default_value ?? null}
              onChange={(_, v) => {
                formik.setFieldValue("default_value", v);
              }}
              renderInput={(props) => {
                return (
                  <FormControl fullWidth>
                    <Typography
                      display="flex"
                      justifyContent="start"
                      fontSize={12}
                      fontWeight="bold"
                      children={"Default Value"}
                    />
                    <TextField
                      {...props}
                      helperText={null}
                      error={false}
                      size="small"
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={11}>
                <Typography
                  variant="h1"
                  fontSize={14}
                  children={TranslateHelper.values()}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    const options = [
                      ...(formik.values.options?.map((e) => ({ ...e })) ?? []),
                    ];
                    options.push({
                      label: "",
                    });
                    formik.setFieldValue("options", options);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                {formik.values.options?.map((e, index) => {
                  return (
                    <>
                      <Grid key={index} container alignItems="center">
                        <Grid item flex={1}>
                          <TextOutlineField
                            fullWidth
                            label={TranslateHelper.label()}
                            value={e.label}
                            helperText={
                              optionError &&
                              optionTouch &&
                              optionTouch[index] &&
                              optionError[index]?.label
                            }
                            error={
                              optionError &&
                              optionTouch &&
                              optionTouch[index] &&
                              optionTouch[index]?.label
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              const options = [
                                ...(formik.values.options?.map((e) => ({
                                  ...e,
                                })) ?? []),
                              ];
                              options[index].label = value;
                              formik.setFieldValue("options", options);
                            }}
                          />
                        </Grid>

                        <Grid item>
                          <IconButton
                            onClick={() => {
                              const options = [
                                ...(formik.values.options?.map((e) => ({
                                  ...e,
                                })) ?? []),
                              ];
                              formik.setFieldValue(
                                "options",
                                options.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    default:
      return <></>;
  }
}

export default FieldDefaultValue;
