import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useAccount,
  useCompanyDialog,
  useUser,
} from "../helper/company_helper";
import RichText from "@Components/RichText";
import { Order } from "@Models/company/company_subscription_order";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { dateToFormat, iyziParser } from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import SubscriptionRepository from "@Repo/subscription_repository";
import VisibilityComp from "@Components/VisibilityComp";
import TranslateHelper from "@Local/index";

function SubscriptionInfoBox(props: { payment?: Order | null }) {
  const { payment } = props;

  /// User store
  const { subscription } = useUser();
  const isCanceled: boolean = Boolean(subscription?.cancellation_date);

  ///
  const { isOwner } = useAccount();

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Subscription repository
  const subRepo = new SubscriptionRepository();

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

  /// Company dialog hook
  const { openSubscriptionDialog, openCancelSubscriptionDialog } =
    useCompanyDialog();

  /// Handle payment
  const handlePayment = async () => {
    const result = await openLoading(async () => {
      return subRepo.updateCard();
    });
    if (!result) return;
    iyziParser(result);
  };

  /// Cancel subscription
  const handleCancelSubscription = async () => {
    const result = await openCancelSubscriptionDialog();
    if (!result) return;
    closeDialog();
    window.location.reload();
  };

  return (
    <>
      <Stack
        sx={{ backgroundColor: "white" }}
        spacing={1}
        divider={<Divider />}
      >
        <Typography
          variant="h1"
          fontSize={16}
          children={TranslateHelper.subscriptionInformation()}
        />
        <Box>
          <Box p={1} borderRadius={1} border={1} borderColor="divider">
            <Stack direction="column" spacing={3} divider={<Divider />}>
              <Stack
                direction="row"
                alignItems="end"
                justifyContent="space-between"
              >
                <Stack>
                  <Typography
                    fontSize={12}
                    fontWeight="400"
                    children={subscription?.subscription_status}
                  />
                  <Typography
                    variant="h1"
                    fontSize={20}
                    children={TranslateHelper.experviceOfferings()}
                  />
                </Stack>
                <VisibilityComp visibility={!isCanceled && isOwner}>
                  <Stack
                    height="100%"
                    display="flex"
                    flexDirection="row"
                    spacing={1}
                    direction="row"
                  >
                    <PrimaryButton
                      height={30}
                      variant="outlined"
                      fontWeight="normal"
                      children={TranslateHelper.cancelSubscription()}
                      onClick={handleCancelSubscription}
                    />
                    <PrimaryButton
                      height={30}
                      variant="outlined"
                      fontWeight="normal"
                      backgroundColor={Colors.primaryLight}
                      color="white"
                      children={TranslateHelper.manageSubscription()}
                      onClick={openSubscriptionDialog}
                    />
                    <Tooltip title={TranslateHelper.payment()}>
                      <IconButton
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        sx={{ p: 0, color: "blue" }}
                        onClick={handlePayment}
                      >
                        <PaymentOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </VisibilityComp>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack flex={1} direction="column">
                  <Typography
                    pb={1}
                    fontWeight="bold"
                    children={TranslateHelper.billingInformation()}
                  />
                  <RichText
                    color="black"
                    title={TranslateHelper.nextPaymentDate()}
                    content={dateToFormat(
                      new Date(payment?.startPeriod ?? 0),
                      true
                    )}
                  />
                  <RichText
                    color="black"
                    title={TranslateHelper.nextPayment()}
                    content={`₺ ${payment?.price}`}
                  />
                </Stack>
                <Stack flex={1} direction="column">
                  <Typography
                    pb={1}
                    fontWeight="bold"
                    children={TranslateHelper.currentPlan()}
                  />
                  <Box
                    borderRadius={1}
                    px={1}
                    py={2}
                    border={1}
                    borderColor="divider"
                  >
                    <Typography
                      fontWeight="bold"
                      fontSize={12}
                      children={subscription?.plan?.translations?.name?.[lng]}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default SubscriptionInfoBox;
