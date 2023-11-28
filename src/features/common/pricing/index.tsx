import { Grid, Typography } from "@mui/material";
import PricingBox from "./components/PricingBox";
import { useDispatch, useSelector } from "react-redux";
import ProductionPlan from "@Models/products/production_plan";
import { useNavigate } from "react-router-dom";
import ERouter from "@Routes/router_enum";
import { setAuthPlan } from "@Store/auth_store";
import { AppDispatch, RootState } from "@Store/index";
import ProductionRepository from "@Repo/production_repository";
import { useEffect, useState } from "react";
import LoadingComp from "@Components/LoadingComp";
import theme from "@Themes/index";

function PricingPage() {
  const { production } = useSelector((state: RootState) => state.production);
  const plans = production?.plans ?? [];

  /// Loading state
  const [loading, setLoading] = useState<boolean>(true);

  /// Dispatch
  const dispatch = useDispatch<AppDispatch>();

  /// Production repository
  const productionRepo = new ProductionRepository();

  /// Navigator
  const navigate = useNavigate();

  /// Select plan handle
  const onSelectPlanHandle = (plan: ProductionPlan) => {
    dispatch(setAuthPlan(plan));
    navigate(ERouter.Regiter);
  };

  /// Initialize component
  useEffect(() => {
    productionRepo.getProduction().then((value) => setLoading(!value));
  }, []);

  return (
    <>
      <Grid container pt={5} justifyContent="center" rowSpacing={10}>
        <Grid item xs={12}>
          <Typography
            px={25}
            variant="h1"
            textAlign={"center"}
            sx={{
              [theme.breakpoints.only("xs")]: {
                px: 10,
              },
            }}
            children={`The right pricing package for every construction team`}
          />
        </Grid>
        <Grid item>
          <LoadingComp loading={loading}>
            <Grid
              container
              spacing={5}
              alignItems="end"
              justifyContent="center"
            >
              {plans.map((plan, index) => {
                return (
                  <Grid key={`plan-${plan.id}`} item>
                    <PricingBox
                      best={index === 1}
                      title={plan.translations?.name?.en}
                      pricing={`${plan.currency_code} ${plan.price}`}
                      description={
                        plan.permission?.translations?.description?.en
                      }
                      permissions={
                        plan?.options?.map((e) => e.translations!.name!.en!) ??
                        []
                      }
                      onClick={() => onSelectPlanHandle(plan)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </LoadingComp>
        </Grid>
      </Grid>
    </>
  );
}

export default PricingPage;
