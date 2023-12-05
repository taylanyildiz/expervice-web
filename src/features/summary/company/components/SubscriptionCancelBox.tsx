import PrimaryButton from "@Components/PrimaryButton";
import { Stack, Typography } from "@mui/material";
import { useUser } from "../helper/company_helper";
import { calculateDiffDay, dateToFormat } from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import SubscriptionRepository from "@Repo/subscription_repository";

function SubscriptionCancelBox() {
  /// User store
  const { subscription } = useUser();
  const cancelDate = new Date(subscription!.cancellation_date!);

  /// Subscription repository
  const subRepository = new SubscriptionRepository();

  /// Dialog hook
  const { openConfirm, openLoading } = useDialog();

  const now = new Date();
  const difDay = calculateDiffDay(now, cancelDate);

  /// Cancel cancellation
  const handleCancel = async () => {
    const confirm = await openConfirm(
      "Cancel subscription cancellation",
      "Are you sure to cancel subscription cancellation?"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return subRepository.cancelCancellation();
    });
    if (!result) return;
    window.location.reload();
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack>
        <Typography
          children={`Your subscription will expire on ${dateToFormat(
            cancelDate,
            true
          )}`}
        />
        <Typography
          children={`${difDay} days left until your membership expires`}
        />
      </Stack>
      <PrimaryButton
        fontWeight="normal"
        variant="outlined"
        children="Cancel"
        onClick={handleCancel}
      />
    </Stack>
  );
}

export default SubscriptionCancelBox;
