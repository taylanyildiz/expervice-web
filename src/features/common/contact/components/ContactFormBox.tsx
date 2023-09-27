import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Colors from "@Themes/colors";
import { Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContactRespository from "@Repo/contact_repository";
import ContactForm from "@Models/contact_form";
import { useFormik } from "formik";
import { contactFormSchema } from "../validations/contact_form_validation";

function ContactFormBox() {
  /// Contact repository
  const contactRepo = new ContactRespository();

  /// Send Form
  const onSendFormHandle = async () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = async (value: ContactForm) => {
    await contactRepo.sendContactForm(value);
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
    <Grid container rowSpacing={1}>
      <Grid
        item
        xs={12}
        children={
          <Typography variant="h1" fontSize={20} children="Contact Form" />
        }
      />
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          label="Full Name"
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
          label="Email"
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
          label="Phone"
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
          label="Subject"
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
          label="Message"
          name="messages"
          value={formik.values?.messages}
          onChange={formik.handleChange}
          helperText={formik.touched?.messages && formik.errors.messages}
          error={Boolean(formik.touched.messages && formik.errors.messages)}
        />
      </Grid>
      <Grid item xs={12} justifyContent="end" display="flex">
        <PrimaryButton
          children="Send"
          suffix={<SendIcon sx={{ width: 20, height: 20 }} />}
          color={Colors.primary}
          backgroundColor={Colors.secodary}
          onClick={onSendFormHandle}
        />
      </Grid>
    </Grid>
  );
}

export default ContactFormBox;
