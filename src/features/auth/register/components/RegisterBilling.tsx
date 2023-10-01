import CrediCard, { CreditFocus } from "@Components/CrediCard";
import InputCustomMask from "@Components/InputCustomMask";
import TextOutlineField from "@Components/TextOutlineField";
import { Grid } from "@mui/material";
import { useState } from "react";

function RegisterBilling() {
  const [focus, setFocus] = useState<CreditFocus>("name");

  /// Focus handle by [name]
  const onFocusHandle = (name: CreditFocus) => {
    setFocus(name);
  };

  return (
    <Grid container mt={10}>
      <Grid item xs={6}>
        <CrediCard
          placeholders={{ name: "Your Name" }}
          number={""}
          expiry={""}
          cvc={"123"}
          name={""}
          focused={focus}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="card_holder_name"
              label="Card Holder Name"
              onFocus={() => onFocusHandle("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <InputCustomMask
              mask="9999 9999 9999 9999"
              placeholder=" "
              onFocus={() => onFocusHandle("number")}
              children={
                <TextOutlineField
                  fullWidth
                  name="card_number"
                  label="Card Number"
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <InputCustomMask
                  mask="99/99"
                  placeholder="MM/YY"
                  onFocus={() => onFocusHandle("expiry")}
                  children={
                    <TextOutlineField
                      fullWidth
                      name="expire"
                      label="Expire Date"
                    />
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextOutlineField
                  fullWidth
                  name="cvc"
                  label="CVC"
                  type="tel"
                  maxLength={3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RegisterBilling;
