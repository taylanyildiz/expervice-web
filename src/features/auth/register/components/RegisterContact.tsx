import TextOutlineField from "@Components/TextOutlineField";
import {
  CitySelect,
  CountrySelect,
  PrimaryButton,
  StateSelect,
} from "@Components/index";
import { City, Country, State } from "@Models/index";
import { Grid, Typography } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { RegisterPrimaryContact } from "../entities";
import { registerPrimaryContactValidation } from "../validator/register_validator";
import Colors from "@Themes/colors";
import { useRegister } from "@Utils/hooks/register_hook";
import { useEffect } from "react";
import { PhoneMask } from "@Components/TextInputMask";

function RegisterContact() {
  /// Register hooks
  const { onNext } = useRegister();

  /// Submit handle
  const submitHandle = (value: RegisterPrimaryContact) => {
    sessionStorage.setItem("register_primary_contact", JSON.stringify(value));
    onNext();
  };

  /// Next to billing click
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  /// Formik register
  const initialValues: RegisterPrimaryContact = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: undefined,
    company_fax: "",
    company_phone: "",
    company_name: "",
    company_web_site: "",
    country: undefined,
    state: undefined,
    street_address: "",
    zip_code: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: registerPrimaryContactValidation,
    onSubmit: submitHandle,
  });

  /// Set values
  const setValues = () => {
    const storage = sessionStorage.getItem("register_primary_contact");
    if (!storage) return;
    const value: RegisterPrimaryContact = JSON.parse(storage);
    for (var [k, v] of Object.entries(value)) {
      formik.setFieldValue(k, v);
    }
  };

  /// Initialize component
  useEffect(() => {
    setValues();
  }, []);

  return (
    <Grid container mt={3} rowSpacing={2}>
      <Grid item xs={12} children={<PrimaryContact formik={formik} />} />
      <Grid item xs={12} children={<BusinessInformation formik={formik} />} />
      <Grid item xs={12} children={<BusinessAddress formik={formik} />} />
      <Grid item xs={12} display="flex" justifyContent="end">
        <PrimaryButton
          onClick={onNextHandle}
          height={30}
          children="Continue to Billing"
          backgroundColor={Colors.primaryLight}
          color="white"
          fontWeight="normal"
          fontSize={12}
        />
      </Grid>
    </Grid>
  );
}

function PrimaryContact(props: {
  formik: FormikProps<RegisterPrimaryContact>;
}) {
  const { formik } = props;

  return (
    <Grid container justifyContent="start">
      <Grid item>
        <Typography variant="h1" fontSize={20} children="Primary Contact" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              label="Primary Contact First Name"
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              helperText={formik.touched.first_name && formik.errors.first_name}
              error={Boolean(
                formik.touched.first_name && formik.errors.first_name
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="last_name"
              type="text"
              label="Primary Contact Last Name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              helperText={formik.touched.last_name && formik.errors.last_name}
              error={Boolean(
                formik.touched.last_name && formik.errors.last_name
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="email"
          type="email"
          label="Primary Contact Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="phone"
          type="tel"
          label="Primary Contact Phone"
          helperText={formik.touched.phone && formik.errors.phone}
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          inputComponent={PhoneMask}
        />
      </Grid>
    </Grid>
  );
}

function BusinessInformation(props: {
  formik: FormikProps<RegisterPrimaryContact>;
}) {
  const { formik } = props;
  return (
    <Grid container justifyContent="start">
      <Grid item>
        <Typography
          variant="h1"
          fontSize={20}
          children="Business Information"
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <TextOutlineField
          fullWidth
          name="company_name"
          type="text"
          label="Business Name"
          onChange={formik.handleChange}
          value={formik.values.company_name}
          helperText={formik.touched.company_name && formik.errors.company_name}
          error={Boolean(
            formik.touched.company_name && formik.errors.company_name
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="company_web_site"
          type="text"
          label="Website"
          onChange={formik.handleChange}
          value={formik.values.company_web_site}
          helperText={
            formik.touched.company_web_site && formik.errors.company_web_site
          }
          error={Boolean(
            formik.touched.company_web_site && formik.errors.company_web_site
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="company_phone"
              type="tel"
              label="Business Phone"
              onChange={formik.handleChange}
              value={formik.values.company_phone}
              helperText={
                formik.touched.company_phone && formik.errors.company_phone
              }
              error={Boolean(
                formik.touched.company_phone && formik.errors.company_phone
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="company_fax"
              type="tel"
              label="Business Fax"
              value={formik.values.company_fax}
              helperText={
                formik.touched.company_fax && formik.errors.company_fax
              }
              error={Boolean(
                formik.touched.company_fax && formik.errors.company_fax
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function BusinessAddress(props: {
  formik: FormikProps<RegisterPrimaryContact>;
}) {
  const { formik } = props;

  /// Select country
  const onChangedCountry = (country?: Country | null) => {
    formik.setFieldValue("country", country);
  };

  /// Select state
  const onChangedState = (state?: State | null) => {
    formik.setFieldValue("state", state);
  };

  /// Select city
  const onChangedCity = (city?: City | null) => {
    formik.setFieldValue("city", city);
  };

  return (
    <Grid container justifyContent="start">
      <Grid item>
        <Typography variant="h1" fontSize={20} children="Business Address" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <CountrySelect
          fullWidth
          label="Country"
          onChanged={onChangedCountry}
          value={formik.values.country}
          helperText={formik.touched.country && formik.errors.country}
          error={Boolean(formik.touched.country && formik.errors.country)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="street_address"
          type="text"
          label="Street Address"
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
        <Grid container columnSpacing={2}>
          <Grid item xs={5}>
            <StateSelect
              fullWidth
              label="State"
              countryId={formik.values.country?.id}
              onChanged={onChangedState}
              value={formik.values.state}
              helperText={formik.touched.state && formik.errors.state}
              error={Boolean(formik.touched.state && formik.errors.state)}
            />
          </Grid>
          <Grid item xs={4}>
            <CitySelect
              fullWidth
              label="City"
              stateId={formik.values.state?.id}
              onChanged={onChangedCity}
              value={formik.values.city}
              helperText={formik.touched.city && formik.errors.city}
              error={Boolean(formik.touched.city && formik.errors.city)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutlineField
              fullWidth
              name="zip_code"
              type="text"
              label="Zip Code"
              onChange={formik.handleChange}
              value={formik.values.zip_code}
              helperText={formik.touched.zip_code && formik.errors.zip_code}
              error={Boolean(formik.touched.zip_code && formik.errors.zip_code)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterContact;
