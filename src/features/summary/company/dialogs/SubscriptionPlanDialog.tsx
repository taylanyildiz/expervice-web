import { useSelector } from "react-redux";
import { useUser } from "../helper/company_helper";
import { RootState } from "@Store/index";
import { useEffect, useState } from "react";
import ProductionRepository from "@Repo/production_repository";
import { DialogCustomActions, DialogCustomTitle } from "@Components/dialogs";
import { Box, DialogContent, Divider, Stack, Typography } from "@mui/material";
import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import LoadingComp from "@Components/LoadingComp";
import VisibilityComp from "@Components/VisibilityComp";
import ProductionPlan from "@Models/products/production_plan";
import { useDialog } from "@Utils/hooks/dialog_hook";
import SubscriptionRepository from "@Repo/subscription_repository";

const defaultBox = {
  borderRadius: 1,
  border: 1,
  p: 1,
  py: 2,
  borderColor: "divider",
};

function SubscriptionPlanDialog() {
  /// User store
  const { subscription } = useUser();

  /// Subscription repository
  const subRepo = new SubscriptionRepository();

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Selected plan
  const [plan, setPlan] = useState<ProductionPlan | null>(null);
  const currentPlanId = plan?.id;

  /// Production store
  const { production } = useSelector((state: RootState) => state.production);
  const plans = production?.plans ?? [];

  /// Production respository
  const productionRepo = new ProductionRepository();

  /// Loading state
  const [loading, setLoading] = useState<boolean>(true);

  /// Initialize component
  useEffect(() => {
    productionRepo.getProduction().then((value) => {
      setLoading(!value);
    });
  }, []);

  /// Listen subscription
  useEffect(() => {
    setPlan(subscription?.plan ?? null);
  }, [subscription]);

  /// Available save button
  const availableSave = currentPlanId !== subscription?.plan?.id;

  const handleSave = async () => {
    const confirm = await openConfirm(
      "Upgrade Plan",
      <section>
        Are you sure to upgrade <b>{plan?.name}</b> plan
      </section>
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return subRepo.upgradePlan(subscription!.id!);
    });
    if (!result) return;
    window.location.reload();
  };

  return (
    <>
      <DialogCustomTitle title="Manage Subscription" />
      <DialogContent>
        <Box mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <LoadingComp height={300} loading={loading}>
            <Stack spacing={1} direction="column" divider={<Divider />}>
              <Typography
                variant="h1"
                fontSize={15}
                children="Edit Subscriptions"
              />
              <Stack spacing={1} direction="column">
                <Typography fontSize={13} children="Available Plans" />
                {plans.map((plan, index) => {
                  const isSelected = plan.id === currentPlanId;
                  const bgColor = isSelected ? Colors.selected : null;
                  const borderColor = isSelected ? Colors.selected : "divider";
                  return (
                    <Box
                      {...defaultBox}
                      key={`plan-item-${index}`}
                      sx={{
                        backgroundColor: bgColor,
                        borderColor,
                        boxShadow: isSelected ? 1 : 0,
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography children={plan.name} />
                        <Typography children={`₺${plan.price}`} />
                      </Stack>
                      <VisibilityComp visibility={plan.id !== currentPlanId}>
                        <PrimaryButton
                          fontWeight="normal"
                          variant="contained"
                          backgroundColor={Colors.primaryLight}
                          color="white"
                          children="Select Plan"
                          onClick={() => setPlan(plan)}
                        />
                      </VisibilityComp>
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </LoadingComp>
        </Box>
      </DialogContent>
      <DialogCustomActions
        actions={[
          <PrimaryButton
            disabled={!availableSave}
            variant="contained"
            color="white"
            fontWeight="normal"
            children="Save"
            onClick={handleSave}
          />,
        ]}
      />
    </>
  );
}

export default SubscriptionPlanDialog;
