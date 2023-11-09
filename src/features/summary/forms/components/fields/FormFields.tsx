import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { EFormFielType } from "../../entities/form_enums";
import Field from "@Models/form/field";
import VisibilityComp from "@Components/VisibilityComp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useFormDialog } from "../../helper/form_helper";
import { FormikProps } from "formik";
import Form from "@Models/form/form";

export interface FormFieldProps {
  fieldType?: EFormFielType | null;
  label?: string | null;
  default_value?: string | null;
  description?: string | null;
  options?: { label: string }[] | null;
}

interface Props {
  formik: FormikProps<Form>;
}

function FormFields(props: Props) {
  const { formik } = props;
  const fields = formik.values.fields ?? [];

  /// Form dialog hook
  const { openFieldDialog } = useFormDialog();

  const isDrodown = (field: Field) =>
    field.field_type_id === EFormFielType.DropDown;

  /// Edit field
  const onEdit = async (field: Field, index: number) => {
    const result = await openFieldDialog(field);
    if (!result) return;
    const values = [...fields];
    values[index] = result;
    formik.setFieldValue("fields", values);
  };

  /// Edit field
  const onDelete = (index: number) => {
    formik.setFieldValue(
      "fields",
      fields.filter((_, i) => i !== index)
    );
  };

  return fields.map((field, index) => (
    <Grid mt={1} item xs={12}>
      <Grid container columnSpacing={1} key={index}>
        <Grid item>
          <Typography variant="h1" fontSize={16} children={`${index + 1} -)`} />
        </Grid>
        <Grid item flex={1}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography
                variant="h1"
                fontSize={13}
                children={
                  <>
                    Field Type :{" "}
                    <b style={{ fontWeight: "normal" }}>
                      {field.field_type?.name}
                    </b>
                  </>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                fontSize={13}
                children={
                  <>
                    Field Label :{" "}
                    <b style={{ fontWeight: "normal" }}>{field.label}</b>
                  </>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                fontSize={13}
                children={
                  <>
                    Field Description :{" "}
                    <b style={{ fontWeight: "normal" }}>{field.description}</b>
                  </>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                fontSize={13}
                children={
                  <>
                    Field Default Value :{" "}
                    <b style={{ fontWeight: "normal" }}>
                      {field.default_value}
                    </b>
                  </>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <VisibilityComp visibility={isDrodown(field)}>
                <Typography
                  variant="h1"
                  fontSize={13}
                  children={
                    <>
                      Field Options :{" "}
                      <Box
                        px={1}
                        sx={{ border: 1 }}
                        overflow="scroll"
                        maxHeight={50}
                      >
                        {field.options?.map((e, index) => {
                          return <li key={index}>{e.label}</li>;
                        })}
                      </Box>
                    </>
                  }
                />
              </VisibilityComp>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Stack direction="row">
            <IconButton onClick={() => onEdit(field, index)}>
              <EditNoteOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  ));
}

export default FormFields;
