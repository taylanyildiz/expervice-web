import { useDialog } from "@Utils/hooks/dialog_hook";
import { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import PrimaryButton from "@Components/PrimaryButton";
import TranslateHelper from "@Local/index";
import FormCustomerSignModel from "./entities/form_customer_sign";
import { useFormik } from "formik";
import { formCustomerValidation } from "./validator/form_customer_validator";
import TextOutlineField from "@Components/TextOutlineField";
import JobRepository from "@Repo/job_repository";
import SignatureBox from "./components/SigntureBox";
import VisibilityComp from "@Components/VisibilityComp";
import SignatureSuccessBox from "./components/SignatureSuccessBox";
import { useQuery } from "@Utils/functions";
import { Navigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import ReactSignatureCanvas from "react-signature-canvas";
import "../../../assets/css/signature.css";

function FormCustomerSign() {
  /// Url query
  const [query] = useQuery();
  const formId = query.get("form_id");

  if (!formId) return <Navigate to={ERouter.Base} />;

  /// Sign ref
  const signRef = useRef<ReactSignatureCanvas>();

  /// Success state
  const [success, setSuccess] = useState(false);

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Job repository
  const jobRepo = new JobRepository();

  /// Clear signature
  const handleClear = () => {
    signRef?.current?.clear();
    formik.resetForm();
  };

  /// Sign form
  const handleSign = () => {
    formik.handleSubmit();
  };

  /// Set signature
  const handleEndSignature = () => {
    const signature = signRef?.current?.toDataURL("image/png", 1.0);
    formik.setFieldValue("signature", signature);
  };

  /// Submit handle
  const handleSubmit = async (value: FormCustomerSignModel) => {
    const confirm = await openConfirm(
      TranslateHelper.signForm(),
      TranslateHelper.sureSignForm()
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return await jobRepo.signFormAsCusomer(parseInt(formId), value);
    });
    setSuccess(result);
  };

  /// Formik
  const initialValues: FormCustomerSignModel = {
    first_name: "",
    last_name: "",
    signature: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: formCustomerValidation,
    onSubmit: handleSubmit,
  });

  return (
    <div className="signature-layout">
      <Box className="signature-box">
        <VisibilityComp visibility={!success}>
          <Stack spacing={3}>
            <Typography
              mb={6}
              variant="h1"
              fontSize={20}
              children={TranslateHelper.signForm()}
            />
            <TextOutlineField
              fullWidth
              name="first_name"
              label={TranslateHelper.firstName()}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              helperText={formik.touched.first_name && formik.errors.first_name}
              error={Boolean(
                formik.touched.first_name && formik.errors.first_name
              )}
            />
            <TextOutlineField
              fullWidth
              name="last_name"
              label={TranslateHelper.lastName()}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              helperText={formik.touched.last_name && formik.errors.last_name}
              error={Boolean(
                formik.touched.last_name && formik.errors.last_name
              )}
            />
            <SignatureBox
              error={Boolean(
                formik.touched.signature && formik.errors.signature
              )}
              helperText={formik.touched.signature && formik.errors.signature}
              onEnd={handleEndSignature}
              ref={signRef}
            />
            <Stack direction="row" spacing={1} justifyContent="center">
              <PrimaryButton
                variant="outlined"
                fontWeight="normal"
                children={TranslateHelper.clear()}
                onClick={handleClear}
              />
              <PrimaryButton
                variant="contained"
                fontWeight="normal"
                color="white"
                children={TranslateHelper.signForm()}
                onClick={handleSign}
              />
            </Stack>
          </Stack>
        </VisibilityComp>
        <VisibilityComp visibility={success}>
          <SignatureSuccessBox />
        </VisibilityComp>
      </Box>
    </div>
  );
}

export default FormCustomerSign;
