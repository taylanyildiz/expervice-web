import SelectUserRole from "@Components/SelectUserRole";
import TextOutlineField from "@Components/TextOutlineField";
import InternalUser from "@Models/internal-user/internal_user";
import { Box, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import InternalUserStatusButton from "./InternalUserStatusButton";
import TranslateHelper from "@Local/index";

function Header(props: { formik: FormikProps<InternalUser> }) {
  const { formik } = props;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container alignItems="center" mb={1}>
        <Grid item flexGrow={1}>
          <Typography variant="h1" fontSize={15} children="Overview" />
        </Grid>
        <Grid item children={<InternalUserStatusButton formik={formik} />} />
      </Grid>
    </Box>
  );
}

function OverViewContent(props: { formik: FormikProps<InternalUser> }) {
  const { formik } = props;
  return (
    <div>
      <Grid container rowSpacing={2}>
        <Grid item xs={12} children={<Header formik={formik} />} />
        <Grid item xs={12}>
          <Grid container columnSpacing={4}>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="first_name"
                label={TranslateHelper.firstName()}
                value={formik.values.first_name}
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                error={Boolean(
                  formik.touched.first_name && formik.errors.first_name
                )}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="last_name"
                label={TranslateHelper.lastName()}
                value={formik.values.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
                error={Boolean(
                  formik.touched.last_name && formik.errors.last_name
                )}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextOutlineField
                fullWidth
                name="email"
                type="email"
                label={TranslateHelper.email()}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextOutlineField
                fullWidth
                name="phone"
                type="tel"
                label={TranslateHelper.phoneNumber()}
                value={formik.values.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={5}>
              <SelectUserRole
                fullWidth
                label={TranslateHelper.role()}
                roleType={3}
                value={formik.values.role_id}
                helperText={formik.touched.role_id && formik.errors.role_id}
                error={Boolean(formik.touched.role_id && formik.errors.role_id)}
                onChanged={(value) => {
                  formik.setFieldValue("role_id", value?.id);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default OverViewContent;
