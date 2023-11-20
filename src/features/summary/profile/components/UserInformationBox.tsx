import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useProfile } from "../helper/profile_helper";
import { caption } from "@Utils/functions";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

function UserInformationBox() {
  /// Account store
  const { user } = useProfile();

  const displayName = `${user?.first_name} ${user?.last_name}`;
  const email = user?.email;
  const userPhone = user?.user_phone;
  const phone = `${userPhone?.phone_code}${userPhone?.phone_number}`;

  return (
    <Box mt={1} sx={{ backgroundColor: "white" }}>
      <Stack spacing={1} direction="column" divider={<Divider />}>
        <Typography
          p={1}
          variant="h1"
          fontSize={16}
          children="User Information"
        />
        <Grid container p={1} columnSpacing={2}>
          <Grid item children={<Avatar children={caption(displayName)} />} />
          <Grid item>
            <Typography variant="h1" fontSize={20} children={displayName} />
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailOutlinedIcon sx={{ width: 15, height: 15 }} />
              <Typography fontSize={13} color="blue" children={email} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocalPhoneOutlinedIcon sx={{ width: 15, height: 15 }} />
              <Typography fontSize={13} color="blue" children={phone} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default UserInformationBox;
