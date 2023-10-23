import {
  SelectCustomer,
  SelectUnitSubType,
  TextOutlineField,
  CitySelect,
  CountrySelect,
  SelectUnitLabel,
  StateSelect,
  TextQRField,
} from "@Components/index";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FormikProps } from "formik";
import Unit from "@Models/units/unit";
import UnitStatusButton from "./UnitStatusButton";
import UnitStatusBox from "./UnitStatusBox";

function Header(props: { status: boolean }) {
  return (
    <Box borderBottom={1} pb={1} borderColor="divider" alignItems="center">
      <Grid container columnSpacing={1}>
        <Grid item>
          <Typography variant="h1" fontSize={14} children="Unit Information" />
        </Grid>
        <Grid item>
          <UnitStatusBox status={props.status} />
        </Grid>
      </Grid>
    </Box>
  );
}

function UnitInformation(props: { formik: FormikProps<Unit> }) {
  const { formik } = props;
  return (
    <>
      <Header status={formik.values.status} />
      <Grid container mt={2} columnSpacing={3}>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="name"
                label="Unit Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectCustomer
                fullWidth
                label="Customer"
                onChanged={(customer) => {
                  formik.setFieldValue("customer", customer);
                }}
                value={formik.values.customer}
                error={Boolean(
                  formik.errors.customer && formik.touched.customer
                )}
                helperText={formik.touched.customer && formik.errors.customer}
              />
            </Grid>
            <Grid item xs={12} children={<Contract formik={formik} />} />
            <Grid item xs={12} children={<Address formik={formik} />} />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container>
            <Grid item xs={12} my={2}>
              <UnitStatusButton formik={formik} />
            </Grid>
            <Grid item xs={12}>
              <SelectUnitSubType
                fullWidth
                label="Unit Sub Type"
                onChanged={(subType) => {
                  formik.setFieldValue("unit_sub_type", subType);
                }}
                value={formik.values.unit_sub_type}
                error={Boolean(
                  formik.errors.unit_sub_type && formik.touched.unit_sub_type
                )}
                helperText={
                  formik.touched.unit_sub_type && formik.errors.unit_sub_type
                }
              />
            </Grid>
            <Grid item xs={12}>
              <SelectUnitLabel
                fullWidth
                label="Unit Label"
                onChanged={(label) => {
                  formik.setFieldValue("unit_label", label);
                }}
                value={formik.values.unit_label}
                error={Boolean(
                  formik.errors.unit_label && formik.touched.unit_label
                )}
                helperText={
                  formik.touched.unit_label && formik.errors.unit_label
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="identity_number"
                label="Identity Number"
                value={formik.values.identity_number}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.identity_number &&
                    formik.touched.identity_number
                )}
                helperText={
                  formik.touched.identity_number &&
                  formik.errors.identity_number
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextOutlineField
                fullWidth
                name="imei"
                label="IMEI"
                value={formik.values.imei}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.imei && formik.touched.imei)}
                helperText={formik.touched.imei && formik.errors.imei}
              />
            </Grid>
            <Grid item xs={12}>
              <TextQRField
                fullWidth
                name="qr_code"
                label="QR Code"
                value={formik.values.qr_code}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.qr_code && formik.touched.qr_code)}
                helperText={formik.touched.qr_code && formik.errors.qr_code}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function Contract(props: { formik: FormikProps<Unit> }) {
  const { formik } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={15} children="Contract" />
      </Grid>
      <Grid item xs={12} mt={1}>
        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="contract_start_date"
              label="Start Date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.contract_start_date}
              error={Boolean(
                formik.errors.contract_start_date &&
                  formik.touched.contract_start_date
              )}
              helperText={
                formik.touched.contract_start_date &&
                formik.errors.contract_start_date
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextOutlineField
              fullWidth
              name="contract_end_date"
              label="End Date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.contract_end_date}
              error={Boolean(
                formik.errors.contract_end_date &&
                  formik.touched.contract_end_date
              )}
              helperText={
                formik.touched.contract_end_date &&
                formik.errors.contract_end_date
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Address(props: { formik: FormikProps<Unit> }) {
  const { formik } = props;

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={15} children="Address" />
      </Grid>
      <Grid item mt={1} xs={12}>
        <CountrySelect
          fullWidth
          label="Country"
          onChanged={(country) => {
            formik.setFieldValue("country", country);
          }}
          value={formik.values.country}
          error={Boolean(formik.errors.country && formik.touched.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
      </Grid>
      <Grid item xs={12}>
        <TextOutlineField
          fullWidth
          name="street_address"
          label="Street Address"
          onChange={formik.handleChange}
          value={formik.values.street_address}
          error={Boolean(
            formik.errors.street_address && formik.touched.street_address
          )}
          helperText={
            formik.touched.street_address && formik.errors.street_address
          }
        />
      </Grid>
      <Grid item xs={5}>
        <StateSelect
          fullWidth
          label="State"
          onChanged={(state) => {
            formik.setFieldValue("state", state);
          }}
          countryId={formik.values.country?.id}
          value={formik.values.state}
          error={Boolean(formik.errors.state && formik.touched.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
      </Grid>
      <Grid item xs={5}>
        <CitySelect
          fullWidth
          label="City"
          onChanged={(city) => {
            formik.setFieldValue("city", city);
          }}
          stateId={formik.values.state?.id}
          value={formik.values.city}
          error={Boolean(formik.errors.city && formik.touched.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid item xs={2}>
        <TextOutlineField
          fullWidth
          name="zip_code"
          label="Zip Code"
          onChange={formik.handleChange}
          value={formik.values.zip_code}
          error={Boolean(formik.errors.zip_code && formik.touched.zip_code)}
          helperText={formik.touched.zip_code && formik.errors.zip_code}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={1} alignItems="center">
          <Grid item xs={5.5}>
            <TextOutlineField
              fullWidth
              name="latitude"
              label="Latitude"
              type="number"
              onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^[0-9.]*$/;
                if (!regex.test(inputValue)) {
                  e.target.value = inputValue.replace(/[^0-9.]/g, "");
                }
                formik.handleChange(e);
              }}
              value={formik.values.latitude}
              error={Boolean(formik.errors.latitude && formik.touched.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextOutlineField
              fullWidth
              name="longitude"
              label="Longitude"
              type="number"
              onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^[0-9.]*$/;
                if (!regex.test(inputValue)) {
                  e.target.value = inputValue.replace(/[^0-9.]/g, "");
                }
                formik.handleChange(e);
              }}
              value={formik.values.longitude}
              error={Boolean(
                formik.errors.longitude && formik.touched.longitude
              )}
              helperText={formik.touched.longitude && formik.errors.longitude}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <LocationOnIcon sx={{ color: "red", width: 25, height: 25 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UnitInformation;
