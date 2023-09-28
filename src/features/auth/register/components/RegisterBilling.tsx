import TextOutlineField from "@Components/TextOutlineField";
import { Grid } from "@mui/material";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function RegisterBilling() {
  return (
    <Grid container mt={2}>
      <Grid item xs={6}>
        <Cards
          placeholders={{
            name: "Your Name",
          }}
          acceptedCards={["visa"]}
          number={""}
          expiry={""}
          cvc={"123"}
          name={""}
          focused="cvc"
        />
      </Grid>
      <Grid item xs={6}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="card_holder_name"
              label="Card Holder Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextOutlineField
              fullWidth
              name="card_number"
              label="Card Name"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <TextOutlineField
                  fullWidth
                  name="card_number"
                  label="Expired Date"
                  type="date"
                />
              </Grid>
              <Grid item xs={6}>
                <TextOutlineField
                  fullWidth
                  name="cvc"
                  label="CVC"
                  type="number"
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
