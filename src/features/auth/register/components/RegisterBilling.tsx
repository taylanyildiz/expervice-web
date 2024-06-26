import CrediCard, { CreditFocus } from "@Components/CrediCard";
import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Colors from "@Themes/colors";
import { useRegister } from "@Utils/hooks/register_hook";
import { useFormik } from "formik";
import { registerBillingValidation } from "../validator/register_validator";
import { CardNumberMask, CardYearMask } from "@Components/TextInputMask";
import { RegisterBilling as RegisterBillingModel } from "../entities";
import TranslateHelper from "@Local/index";
import theme from "@Themes/index";

function RegisterBilling() {
  /// Register hook
  const { onNext, onBack } = useRegister();

  const [focus, setFocus] = useState<CreditFocus>("name");

  /// Focus handle by [name]
  const onFocusHandle = (name: CreditFocus) => {
    setFocus(name);
  };

  /// Next handle
  const onNextHandle = () => {
    formik.handleSubmit();
  };

  /// Submit handle
  const onSubmitHandle = (values: RegisterBillingModel) => {
    sessionStorage.setItem("register_billing", JSON.stringify(values));
    onNext();
  };

  const initialValues: RegisterBillingModel = {
    card_holder_name: "",
    card_number: "",
    cvc: "",
    expire: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: registerBillingValidation,
    onSubmit: onSubmitHandle,
  });

  /// Set formik values
  /// from session storage
  const setValues = () => {
    const value = sessionStorage.getItem("register_billing");
    if (!value) return;
    const billing: RegisterBillingModel = JSON.parse(value);
    for (var [k, v] of Object.entries(billing)) {
      formik.setFieldValue(k, v);
    }
  };

  /// Initialize component
  useEffect(() => {
    setValues();
  }, []);

  return (
    <Grid
      container
      mt={10}
      spacing={1}
      sx={{
        [theme.breakpoints.down("lg")]: {
          flexDirection: "column",
        },
      }}
    >
      <Grid item xs>
        <CrediCard
          placeholders={{ name: "Your Name" }}
          number={formik.values.card_number ?? ""}
          expiry={formik.values.expire ?? ""}
          cvc={formik.values.cvc ?? ""}
          name={formik.values.card_holder_name ?? ""}
          focused={focus}
        />
      </Grid>
      <Grid item xs>
        <Grid container>
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="card_holder_name"
              label={TranslateHelper.cardHolderName()}
              onChange={formik.handleChange}
              value={formik.values.card_holder_name}
              helperText={
                formik.touched.card_holder_name &&
                formik.errors.card_holder_name
              }
              error={Boolean(
                formik.touched.card_holder_name &&
                  formik.errors.card_holder_name
              )}
              onFocus={() => onFocusHandle("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="card_number"
              label={TranslateHelper.cardNumber()}
              onChange={formik.handleChange}
              helperText={
                formik.touched.card_number && formik.errors.card_number
              }
              error={Boolean(
                formik.touched.card_number && formik.errors.card_number
              )}
              inputComponent={CardNumberMask}
              onFocus={() => setFocus("number")}
              value={formik.values.card_number}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <TextOutlineField
                  fullWidth
                  name="expire"
                  label={TranslateHelper.expireDate()}
                  helperText={formik.touched.expire && formik.errors.expire}
                  error={Boolean(formik.touched.expire && formik.errors.expire)}
                  inputComponent={CardYearMask}
                  onChange={formik.handleChange}
                  onFocus={() => setFocus("expiry")}
                  value={formik.values.expire}
                />
              </Grid>
              <Grid item xs={6}>
                <TextOutlineField
                  fullWidth
                  name="cvc"
                  label={TranslateHelper.cvc()}
                  type="tel"
                  maxLength={3}
                  onFocus={() => onFocusHandle("cvc")}
                  onChange={formik.handleChange}
                  value={formik.values.cvc}
                  helperText={formik.touched.cvc && formik.errors.cvc}
                  error={Boolean(formik.touched.cvc && formik.errors.cvc)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6} justifyContent="start" display="flex">
            <PrimaryButton
              prefix={<ArrowBackIosIcon />}
              height={30}
              onClick={onBack}
              children={TranslateHelper.back()}
              variant="outlined"
              color="black"
              backgroundColor="white"
              fontWeight="normal"
              border="1px solid grey"
              fontSize={12}
            />
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <PrimaryButton
              onClick={onNextHandle}
              height={30}
              children={TranslateHelper.continue()}
              backgroundColor={Colors.primaryLight}
              color="white"
              fontWeight="normal"
              fontSize={12}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterBilling;
