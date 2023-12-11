import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import Colors from "@Themes/colors";
import { Grid, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRegister } from "@Utils/hooks/register_hook";
import {
  RegisterAccount,
  RegisterBilling,
  RegisterPassword as RegisterPasswordModel,
  RegisterPrimaryContact,
} from "../entities";
import { useFormik } from "formik";
import { registerPasswordValidation } from "../validator/register_validator";
import AuthRepository from "@Repo/auth_repository";
import { useSelector } from "react-redux";
import { RootState } from "@Store/index";
import {
  cardNumberMaskParse,
  expireMaskParse,
  phoneMaskParse,
} from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import TranslateHelper from "@Local/index";

function RegisterPassword() {
  /// Rgister hook
  const { onNext, onBack } = useRegister();

  /// Authentication store
  const { plan } = useSelector((state: RootState) => state.auth);

  /// Dialog hook
  const { openLoading } = useDialog();

  /// Authentication repo
  const authRepo = new AuthRepository();

  /// Submit handle
  const onSubmitHandle = async (values: RegisterPasswordModel) => {
    const primaryContact: RegisterPrimaryContact = JSON.parse(
      sessionStorage.getItem("register_primary_contact")!
    );
    const billing: RegisterBilling = JSON.parse(
      sessionStorage.getItem("register_billing")!
    );

    /// Phone parser
    const { code, number } = phoneMaskParse(primaryContact.phone!)!;

    /// Expire parser
    const { month, year } = expireMaskParse(billing.expire!)!;

    /// Card number parser
    const cardNumber = cardNumberMaskParse(billing.card_number)!;

    const registerAccount: RegisterAccount = {
      first_name: primaryContact.first_name!,
      last_name: primaryContact.last_name!,
      email: primaryContact.email!,
      phone_code: code,
      phone_number: number,
      password: values.password!,
      company_name: primaryContact.company_name!,
      company_web_site: primaryContact.company_web_site!,
      company_phone: primaryContact.company_phone!,
      company_fax: primaryContact.company_fax,
      country_id: primaryContact.country!.id!,
      state_id: primaryContact.state!.id!,
      city_id: primaryContact.city!.id!,
      street_address: primaryContact.street_address!,
      zip_code: primaryContact.zip_code!,
      plan_id: plan!.id!,
      card_holder_name: billing.card_holder_name!,
      card_number: cardNumber,
      expire_year: year,
      expire_month: month,
      cvc: billing.cvc!,
    };

    const result: boolean | null = await openLoading(async () => {
      return authRepo.register(registerAccount);
    });
    if (!result) return;
    onNext();
  };

  /// Next handle
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  const initialValues: RegisterPasswordModel = {
    password: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: registerPasswordValidation,
    onSubmit: onSubmitHandle,
  });

  return (
    <Grid container mt={3}>
      <Grid item xs={12} justifyContent="start" display="flex">
        <Typography
          variant="h1"
          fontSize={20}
          children={TranslateHelper.definePassword()}
        />
      </Grid>
      <Grid item xs={7} mt={2}>
        <TextOutlineField
          fullWidth
          secret
          type="password"
          name="password"
          label={TranslateHelper.password()}
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
        />
      </Grid>
      <Grid item xs={7}>
        <TextOutlineField
          fullWidth
          secret
          name="confirm_password"
          label={TranslateHelper.confirmPassword()}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          error={Boolean(
            formik.touched.confirm_password && formik.errors.confirm_password
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6} justifyContent="start" display="flex">
            <PrimaryButton
              prefix={<ArrowBackIosIcon />}
              onClick={onBack}
              children={TranslateHelper.back()}
              variant="outlined"
              color="black"
              backgroundColor="white"
              fontWeight="normal"
              border="1px solid grey"
              fontSize={12}
              height={30}
            />
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <PrimaryButton
              onClick={onNextHandle}
              children={TranslateHelper.done()}
              backgroundColor={Colors.primaryLight}
              color="white"
              fontWeight="normal"
              fontSize={12}
              height={30}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterPassword;
