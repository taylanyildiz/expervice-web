import { Grid, Typography } from "@mui/material";
import PricingBox from "./components/PricingBox";
import { useDispatch, useSelector } from "react-redux";
import ProductionPlan from "@Models/products/production_plan";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import { setAuthPlan } from "@Store/auth_store";
import { AppDispatch, RootState } from "@Store/index";

function PricingPage() {
  const { production } = useSelector((state: RootState) => state.production);
  const plans = production?.plans ?? [];

  /// Dispatch
  const dispatch = useDispatch<AppDispatch>();

  /// Navigator
  const navigate = useNavigate();

  /// Select plan handle
  const onSelectPlanHandle = (plan: ProductionPlan) => {
    dispatch(setAuthPlan(plan));
    navigate(ERouter.Regiter);
  };

  return (
    <>
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
            {plans.map((plan, index) => {
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
                    onClick={() => onSelectPlanHandle(plan)}
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
