import TextOutlineField from "@Components/TextOutlineField";
import {
  CitySelect,
  CountrySelect,
  SelectUserGroup,
  StateSelect,
  StatusBox,
} from "@Components/index";
import Customer from "@Models/customer/customer";
import { Box, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useCustomer } from "../helpers/customer_user_helper";
import CustomerStatusButton from "./CustomerStatusButton";
import TranslateHelper from "@Local/index";

interface Props {
  formik: FormikProps<Customer>;
}

function Header(props: { formik: FormikProps<Customer> }) {
  const { formik } = props;
  const { customer } = useCustomer();
  const email = customer?.email;
  const status = customer?.status;
  return (
    <Box mb={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid container>
        <Grid item flex={1}>
          <Grid container columnSpacing={1}>
            <Grid item>
              <Typography
                variant="h1"
                fontSize={14}
                children={TranslateHelper.contactInformation()}
              />
            </Grid>
            <Grid item>
              <StatusBox email={email} status={status!} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CustomerStatusButton formik={formik} />
        </Grid>
      </Grid>
    </Box>
  );
}

function CustomerContactInformation(props: Props) {
  const { formik } = props;

  return (
    <>
      <Header formik={formik} />
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Grid container columnSpacing={1}>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="first_name"
                label={TranslateHelper.firstName()}
                onChange={formik.handleChange}
                value={formik.values.first_name}
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                error={Boolean(
                  formik.touched.first_name && formik.errors.first_name
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="last_name"
                label={TranslateHelper.lastName()}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
                error={Boolean(
                  formik.touched.last_name && formik.errors.last_name
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="display_name"
                label={TranslateHelper.displayName()}
                onChange={formik.handleChange}
                value={formik.values.display_name}
                helperText={
                  formik.touched.display_name && formik.errors.display_name
                }
                error={Boolean(
                  formik.touched.display_name && formik.errors.display_name
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectUserGroup
                fullWidth
                label={TranslateHelper.group()}
                value={formik.values.group}
                onChanged={(value) => {
                  formik.setFieldValue("group", value);
                }}
                helperText={formik.touched.group && formik.errors.group}
                error={Boolean(formik.touched.group && formik.errors.group)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="email"
                type="email"
                label={TranslateHelper.email()}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="phone"
                type="tel"
                label={TranslateHelper.phoneNumber()}
                onChange={formik.handleChange}
                value={formik.values.phone}
                helperText={formik.touched.phone && formik.errors.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextOutlineField
                fullWidth
                name="cell_phone"
                type="tel"
                label={TranslateHelper.cellPhone()}
                onChange={formik.handleChange}
                value={formik.values.cell_phone}
                helperText={
                  formik.touched.cell_phone && formik.errors.cell_phone
                }
                error={Boolean(
                  formik.touched.cell_phone && formik.errors.cell_phone
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" fontSize={14} children="Address" />
            </Grid>
            <Grid item mt={2} xs={12}>
              <TextOutlineField
                fullWidth
                name="street_address"
                label={TranslateHelper.streetAddress()}
                onChange={formik.handleChange}
                value={formik.values.street_address}
                helperText={
                  formik.touched.street_address && formik.errors.street_address
                }
                error={Boolean(
                  formik.touched.street_address && formik.errors.street_address
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <CountrySelect
                fullWidth
                label={TranslateHelper.country()}
                onChanged={(country) => {
                  formik.setFieldValue("country", country);
                }}
                value={formik.values.country}
                helperText={formik.touched.country && formik.errors.country}
                error={Boolean(formik.touched.country && formik.errors.country)}
              />
            </Grid>
            <Grid item xs={5}>
              <StateSelect
                fullWidth
                label={TranslateHelper.state()}
                countryId={formik.values.country?.id}
                onChanged={(state) => {
                  formik.setFieldValue("state", state);
                }}
                value={formik.values.state}
                helperText={formik.touched.state && formik.errors.state}
                error={Boolean(formik.touched.state && formik.errors.state)}
              />
            </Grid>
            <Grid item xs={4}>
              <CitySelect
                fullWidth
                label={TranslateHelper.city()}
                stateId={formik.values.state?.id}
                onChanged={(city) => {
                  formik.setFieldValue("city", city);
                }}
                value={formik.values.city}
                helperText={formik.touched.city && formik.errors.city}
                error={Boolean(formik.touched.city && formik.errors.city)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextOutlineField
                fullWidth
                name="zip_code"
                label={TranslateHelper.zipCode()}
                onChange={formik.handleChange}
                value={formik.values.zip_code}
                helperText={formik.touched.zip_code && formik.errors.zip_code}
                error={Boolean(
                  formik.touched.zip_code && formik.errors.zip_code
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CustomerContactInformation;
