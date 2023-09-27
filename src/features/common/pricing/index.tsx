import { Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import PricingBox from "./components/PricingBox";
import { useSelector } from "react-redux";
import { RootState } from "@Utils/hooks";

function PricingPage() {
  const { production } = useSelector((state: RootState) => state.production);
  const plans = production?.plans ?? [];

  return (
    <>
      <Helmet>
        <title>Expervice Pricing</title>
      </Helmet>
      <Grid container justifyContent="center" pt={5} px={20} rowSpacing={3}>
        <Grid
          item
          px={10}
          xs={12}
          children={
            <Typography
              variant="h1"
              textAlign="center"
              children="The right pricing package for every construction team"
            />
          }
        />
        <Grid item>
          <Grid container spacing={5} alignItems="end">
            {plans.reverse().map((plan, index) => {
              return (
                <Grid key={plan.id} item>
                  <PricingBox
                    best={index === 1}
                    title={plan.translations?.name?.en}
                    pricing={`${plan.currency_code} ${plan.price}`}
                    description={plan.permission?.translations?.description?.en}
                    permissions={
                      plan?.options?.map((e) => e.translations!.name!.en!) ?? []
                    }
                    onClick={() => {}}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PricingPage;
