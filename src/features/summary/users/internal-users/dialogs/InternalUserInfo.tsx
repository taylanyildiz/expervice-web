import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useInternal } from "../helper/internal_user_helper";
import RichText from "@Components/RichText";
import StatusBox from "@Components/StatusBox";

function InternalUserInfo() {
  // Internal hooks
  const { internalUser: user } = useInternal();

  /// If not exist
  if (!user) return <></>;

  const status = user.status;
  const displayName = `${user.first_name} ${user.last_name}`;

  const email = user.email;
  const hasEmail = Boolean(email);

  const phone = user.phone;
  const hasPhone = Boolean(phone);

  return (
    <Box sx={{ mt: 2, backgroundColor: "white" }}>
      <Stack divider={<Divider />}>
        <Box m={1}>
          <Grid container columnSpacing={1}>
            <Grid item>
              <Typography variant="h1" fontSize={14} children="User Info" />
            </Grid>
            <Grid item>
              <StatusBox email={email} status={status!} />
            </Grid>
          </Grid>
        </Box>
        <Grid container m={1}>
          <Grid item xs={12}>
            <RichText title="Name :" content={displayName} />
          </Grid>
          <Grid item xs={12}>
            <RichText visibility={hasEmail} title="Email :" content={email} />
          </Grid>
          <Grid item xs={12}>
            <RichText visibility={hasPhone} title="Phone :" content={phone} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default InternalUserInfo;
