import PrimaryButton from "@Components/PrimaryButton";
import Colors from "@Themes/colors";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useCompanyDialog, useUser } from "../helper/company_helper";
import RichText from "@Components/RichText";

function SubscriptionInfoBox() {
  /// User store
  const { subscription } = useUser();

  /// Company dialog hook
  const { openSubscriptionDialog, openCancelSubscriptionDialog } =
    useCompanyDialog();

  return (
    <Stack
      mt={1}
      sx={{ backgroundColor: "white" }}
      spacing={1}
      divider={<Divider />}
    >
      <Typography
        variant="h1"
        fontSize={16}
        p={1}
        children="Subscription Information"
      />
      <Box p={1}>
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
              <Stack spacing={1} direction="row">
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
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack flex={1} direction="column">
                <Typography pb={1} fontWeight="bold" children="Billgin Info" />
                <RichText
                  color="black"
                  title="Next Payment Date:"
                  content={""}
                />
                <RichText color="black" title="Next Payment:" content={""} />
              </Stack>
              <Stack flex={1} direction="column">
                <Typography pb={1} fontWeight="bold" children="Current Plan" />
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
  );
}

export default SubscriptionInfoBox;
