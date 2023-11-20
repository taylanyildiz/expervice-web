import TextOutlineField from "@Components/TextOutlineField";
import { CitySelect, CountrySelect, StateSelect } from "@Components/index";
import CompanyAddress from "@Models/company/company_address";
import CompanyInfo from "@Models/company/company_info";
import { Grid, Typography } from "@mui/material";
import { FormikErrors, FormikProps, FormikTouched } from "formik";

function CompanyOverview(props: { formik: FormikProps<CompanyInfo> }) {
  const { formik } = props;

  const optionError = formik.errors.company_address as FormikErrors<
    CompanyAddress | undefined
  >;
  const optionTouch = formik.touched.company_address as FormikTouched<
    CompanyAddress | undefined
  >;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={14} children="Company Information" />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="name"
          label="Company Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          helperText={formik.touched.name && formik.errors.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="web_site"
          label="Web site"
          value={formik.values.web_site}
          onChange={formik.handleChange}
          helperText={formik.touched.web_site && formik.errors.web_site}
          error={Boolean(formik.touched.web_site && formik.errors.web_site)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="phone_number"
          label="Phone Number"
          type="tel"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          helperText={formik.touched.phone_number && formik.errors.phone_number}
          error={Boolean(
            formik.touched.phone_number && formik.errors.phone_number
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextOutlineField
          fullWidth
          name="fax_number"
          label="Fax Number"
          type="tel"
          value={formik.values.fax_number}
          onChange={formik.handleChange}
          helperText={formik.touched.fax_number && formik.errors.fax_number}
          error={Boolean(formik.touched.fax_number && formik.errors.fax_number)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={14} children="Company Address" />
      </Grid>
      <Grid item xs={4}>
        <CountrySelect
          fullWidth
          label="Country"
          value={formik.values.company_address?.country}
          onChanged={(country) => {
            formik.setFieldValue("company_address.country", country);
          }}
          helperText={optionTouch?.country && optionError?.country}
          error={Boolean(optionTouch?.country && optionError?.country)}
        />
      </Grid>
      <Grid item xs={4}>
        <StateSelect
          fullWidth
          label="State"
          value={formik.values.company_address?.state}
          countryId={formik.values.company_address?.country?.id}
          onChanged={(state) => {
            formik.setFieldValue("company_address.state", state);
          }}
          helperText={optionTouch?.state && optionError?.state}
          error={Boolean(optionTouch?.state && optionError?.state)}
        />
      </Grid>
      <Grid item xs={4}>
        <CitySelect
          fullWidth
          label="City"
          value={formik.values.company_address?.city}
          stateId={formik.values.company_address?.state?.id}
          onChanged={(city) => {
            formik.setFieldValue("company_address.city", city);
          }}
          helperText={optionTouch?.city && optionError?.city}
          error={Boolean(optionTouch?.city && optionError?.city)}
        />
      </Grid>
      <Grid item xs={8}>
        <TextOutlineField
          fullWidth
          name="company_address.street_address"
          label="Street Address"
          value={formik.values.company_address?.street_address}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextOutlineField
          fullWidth
          name="company_address.zip_code"
          label="Zip Code"
          value={formik.values.company_address?.zip_code}
          onChange={formik.handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default CompanyOverview;
