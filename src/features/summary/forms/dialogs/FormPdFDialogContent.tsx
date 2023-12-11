import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Form from "@Models/form/form";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";
import AddIcon from "@mui/icons-material/Add";
import FormFields from "../components/FormFields";
import { useForm, useFormDialog } from "../helper/form_helper";
import LoadingComp from "@Components/LoadingComp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormRepository from "@Repo/form_repository";
import { LoadingButton } from "@mui/lab";
import TranslateHelper from "@Local/index";

interface FormPdFDialogContentProps {
  formik: FormikProps<Form>;
}

function FormPdFDialogContent(props: FormPdFDialogContentProps) {
  const { formik } = props;
  const fields = formik.values.fields ?? [];

  /// Form repository
  const formRepo = new FormRepository();

  /// Form store
  const { formPdfTemplate, formTemplateLoading } = useForm();

  /// Form Dialog hook
  const { openFieldDialog } = useFormDialog();

  /// Add field
  const onAddField = async () => {
    const result = await openFieldDialog();
    if (!result) return;
    formik.setFieldValue("fields", [
      ...fields,
      { ...result, order_number: fields.length },
    ]);
  };

  /// Handle review form
  const onReviewHandle = async () => {
    await formRepo.formPdfTemplate({
      name: formik.values.name,
      fields: formik.values.fields,
    });
  };

  return (
    <Grid container flex={1}>
      <Grid item flex={1} pr={5}>
        <Stack spacing={1}>
          <Typography
            variant="h1"
            fontSize={15}
            children={TranslateHelper.formContent()}
          />
          <TextOutlineField
            fullWidth
            name="name"
            label={TranslateHelper.name()}
            helperText={formik.touched.name && formik.errors.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Stack
            mb={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={15}
              children={TranslateHelper.formFields()}
            />
            <PrimaryButton
              color="blue"
              prefix={<AddIcon />}
              children={TranslateHelper.addField()}
              variant="text"
              onClick={() => onAddField()}
            />
          </Stack>
          <FormFields formik={formik} />
        </Stack>
      </Grid>
      <Grid item xs={1}>
        <LoadingButton
          size="small"
          loading={formTemplateLoading}
          loadingPosition="start"
          startIcon={<ChevronRightIcon />}
          variant="outlined"
          onClick={onReviewHandle}
          children={TranslateHelper.preview()}
        />
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ height: 530 }}>
          <LoadingComp loading={!Boolean(formPdfTemplate)}>
            <embed
              width="100%"
              height="100%"
              src={`data:application/pdf;base64,${formPdfTemplate}`}
            />
          </LoadingComp>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FormPdFDialogContent;
