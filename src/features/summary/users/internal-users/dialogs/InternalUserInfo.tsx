import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useInternal } from "../helper/internal_user_helper";
import RichText from "@Components/RichText";
import StatusBox from "@Components/StatusBox";
import TranslateHelper from "@Local/index";

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
              <Typography
                variant="h1"
                fontSize={14}
                children={TranslateHelper.userInformation()}
              />
            </Grid>
            <Grid item>
              <StatusBox email={email} status={status!} />
            </Grid>
          </Grid>
        </Box>
        <Stack direction="column" p={1}>
          <RichText
            color="black"
            title={`${TranslateHelper.name()} :`}
            content={displayName}
          />
          <RichText
            color="black"
            visibility={hasEmail}
            title={`${TranslateHelper.email()} :`}
            content={email}
            fontSize={11}
          />
          <RichText
            color="black"
            visibility={hasPhone}
            title={`${TranslateHelper.phone()} :`}
            content={phone}
            fontSize={11}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default InternalUserInfo;
