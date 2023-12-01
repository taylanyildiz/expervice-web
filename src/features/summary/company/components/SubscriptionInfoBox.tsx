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
import { useCompanyDialog, useUser } from "../helper/company_helper";
import RichText from "@Components/RichText";
import { Order } from "@Models/company/company_subscription_order";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { dateToFormat, iyziParser } from "@Utils/functions";
import { useDialog } from "@Utils/hooks/dialog_hook";
import SubscriptionRepository from "@Repo/subscription_repository";
import VisibilityComp from "@Components/VisibilityComp";

function SubscriptionInfoBox(props: { payment?: Order | null }) {
  const { payment } = props;

  /// User store
  const { subscription } = useUser();
  const isCanceled: boolean = Boolean(subscription?.cancellation_date);

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
    closeDialog();
    iyziParser(result.checkoutFormContent);
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
          children="Subscription Information"
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
                    children="Expervice Offerings"
                  />
                </Stack>
                <VisibilityComp visibility={!isCanceled}>
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
                      children="Cancel Subscription"
                      onClick={openCancelSubscriptionDialog}
                    />
                    <PrimaryButton
                      height={30}
                      variant="outlined"
                      fontWeight="normal"
                      backgroundColor={Colors.primaryLight}
                      color="white"
                      children="Manage Subscription"
                      onClick={openSubscriptionDialog}
                    />
                    <Tooltip title="Payment">
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
                    children="Billgin Info"
                  />
                  <RichText
                    color="black"
                    title="Next Payment Date:"
                    content={dateToFormat(new Date(payment?.startPeriod ?? 0))}
                  />
                  <RichText
                    color="black"
                    title="Next Payment:"
                    content={`₺ ${payment?.price}`}
                  />
                </Stack>
                <Stack flex={1} direction="column">
                  <Typography
                    pb={1}
                    fontWeight="bold"
                    children="Current Plan"
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
                      children={subscription?.plan?.name}
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
