import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useUser } from "../helper/company_helper";
import { caption } from "@Utils/functions";
import Colors from "@Themes/colors";
import RichText from "@Components/RichText";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

function CompanyInfo() {
  /// User store
  const { company } = useUser();
  const image = company?.company_image;
  const address = company?.company_address;

  return (
    <Box mt={1} sx={{ backgroundColor: "white" }}>
      <Stack direction="column" divider={<Divider />}>
        <Typography
          p={1}
          variant="h1"
          fontSize={17}
          children="Company Information"
        />
        <Grid container p={1} columnSpacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                color: "white",
                backgroundColor: Colors.primary,
              }}
              alt={company?.name}
              children={caption(company?.name)}
              src={image?.image_url}
            />
          </Grid>
          <Grid item>
            <Stack direction="column">
              <Typography variant="h1" fontSize={16} children={company?.name} />

              <RichText
                color="black"
                title={
                  <AccountCircleOutlinedIcon sx={{ width: 15, height: 15 }} />
                }
                content={`${company?.company_user?.first_name} ${company?.company_user?.last_name}`}
              />
              <RichText
                color="black"
                title={
                  <MailOutlineOutlinedIcon sx={{ width: 15, height: 15 }} />
                }
                content={company?.company_user?.email}
              />
              <RichText
                visibility={Boolean(company?.web_site)}
                color="black"
                title={<LanguageOutlinedIcon sx={{ width: 15, height: 15 }} />}
                contentProps={{ color: "blue" }}
                content={company?.web_site}
              />
            </Stack>
          </Grid>
          <Grid item display="flex" alignSelf="start">
            <Stack direction="column">
              <Typography variant="h1" fontSize={14} children="Address" />
              <Typography
                fontSize={13}
                children={`${address?.state?.name} / ${address?.city?.name}`}
              />
              <Typography
                fontSize={13}
                children={`${address?.street_address} ${address?.zip_code}`}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default CompanyInfo;
