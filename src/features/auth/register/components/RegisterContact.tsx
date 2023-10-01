import TextOutlineField from "@Components/TextOutlineField";
import { CitySelect, CountrySelect, StateSelect } from "@Components/index";
import { City, Country, State } from "@Models/index";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

function RegisterContact() {
  return (
    <Grid container mt={3} rowSpacing={2}>
      <Grid item xs={12} children={<PrimaryContact />} />
      <Grid item xs={12} children={<BusinessInformation />} />
      <Grid item xs={12} children={<BusinessAddress />} />
    </Grid>
  );
}

export default RegisterContact;

function PrimaryContact() {
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
              name="first_name"
              type="text"
              label="Primary Contact First Name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="last_name"
              type="text"
              label="Primary Contact Last Name"
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
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="phone"
          type="tel"
          label="Primary Contact Phone"
        />
      </Grid>
    </Grid>
  );
}

function BusinessInformation() {
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
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="company_web_site"
          type="text"
          label="Website"
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="company_fax"
              type="tel"
              label="Business Fax"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function BusinessAddress() {
  const [c, setC] = useState<Country | null | undefined>(null);
  const [s, setS] = useState<State | null | undefined>(null);
  const [ct, setCt] = useState<City | null | undefined>(null);

  return (
    <Grid container justifyContent="start">
      <Grid item>
        <Typography variant="h1" fontSize={20} children="Business Address" />
      </Grid>
      <Grid item xs={12} mt={2}>
        <CountrySelect
          fullWidth
          value={c}
          onChanged={(c) => {
            setC(c);
            setS(null);
          }}
          label="Country"
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="street_address"
          type="text"
          label="Street Address"
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item xs={5}>
            <StateSelect
              fullWidth
              countryId={c?.id}
              value={s}
              onChanged={(s) => setS(s)}
              label="State"
            />
          </Grid>
          <Grid item xs={4}>
            <CitySelect
              fullWidth
              stateId={s?.id}
              value={ct}
              onChanged={(c) => setCt(c)}
              label="City"
            />
          </Grid>
          <Grid item xs={3}>
            <TextOutlineField
              fullWidth
              name="zip_code"
              type="text"
              label="Zip Code"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
