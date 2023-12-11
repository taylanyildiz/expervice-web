import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Colors from "@Themes/colors";
import { Box, Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContactRespository from "@Repo/contact_repository";
import ContactForm from "@Models/contact_form";
import { useFormik } from "formik";
import { contactFormSchema } from "../validations/contact_form_validation";
import { useDialog } from "@Utils/hooks/dialog_hook";
import TranslateHelper from "@Local/index";

function ContactFormBox() {
  /// Contact repository
  const contactRepo = new ContactRespository();

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Send Form
  const onSendFormHandle = async () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (value: ContactForm) => {
    const result = await openLoading(async () => {
      return await contactRepo.sendContactForm(value);
    });
    if (!result) return;
    formik.resetForm();
  };

  /// Formik
  const initialValues: ContactForm = {
    full_name: "",
    email: "",
    messages: "",
    phone: "",
    subject: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: contactFormSchema,
    onSubmit: onSubmitHandle,
  });

  return (
    <Box className="contact-form">
      <Grid container>
        <Grid
          item
          xs={12}
          children={
            <Typography
              variant="h1"
              fontSize={20}
              children={TranslateHelper.contactForm()}
            />
          }
        />
        <Grid item xs={12} mt={2}>
          <TextOutlineField
            fullWidth
            label={TranslateHelper.fullName()}
            name="full_name"
            value={formik.values?.full_name}
            onChange={formik.handleChange}
            helperText={formik.touched?.full_name && formik.errors.full_name}
            error={Boolean(formik.touched.full_name && formik.errors.full_name)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextOutlineField
            fullWidth
            label={TranslateHelper.email()}
            name="email"
            value={formik.values?.email}
            onChange={formik.handleChange}
            helperText={formik.touched?.email && formik.errors.email}
            error={Boolean(formik.touched?.email && formik.errors.email)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextOutlineField
            fullWidth
            label={TranslateHelper.phone()}
            name="phone"
            value={formik.values?.phone}
            onChange={formik.handleChange}
            helperText={formik.touched?.phone && formik.errors.phone}
            error={Boolean(formik.touched.phone && formik.errors.phone)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextOutlineField
            fullWidth
            label={TranslateHelper.subject()}
            name="subject"
            value={formik.values?.subject}
            onChange={formik.handleChange}
            helperText={formik.touched?.subject && formik.errors.subject}
            error={Boolean(formik.touched.subject && formik.errors.subject)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextOutlineField
            fullWidth
            multiline
            minRows={4}
            maxRows={4}
            label={TranslateHelper.message()}
            name="messages"
            value={formik.values?.messages}
            onChange={formik.handleChange}
            helperText={formik.touched?.messages && formik.errors.messages}
            error={Boolean(formik.touched.messages && formik.errors.messages)}
          />
        </Grid>
        <Grid item xs={12} justifyContent="end" display="flex">
          <PrimaryButton
            children={TranslateHelper.send()}
            suffix={<SendIcon sx={{ width: 20, height: 20 }} />}
            color={Colors.primary}
            backgroundColor={Colors.secodary}
            onClick={onSendFormHandle}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactFormBox;
