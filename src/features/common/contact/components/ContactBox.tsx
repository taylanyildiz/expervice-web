import Images from "@Assets/images";
import TranslateHelper from "@Local/index";
import { Box, Stack, Typography } from "@mui/material";

function ContactBox() {
  return (
    <Box height={300} width="100%" display="flex">
      <Box
        display="flex"
        justifyContent="end"
        width={"100%"}
        children={Images.contactUs({ height: 300, width: 600 })}
      />
      <Box
        className="contact-box-gradient"
        overflow="hidden"
        position="absolute"
        sx={{ height: 300, width: "100%" }}
      >
        <Stack p={10}>
          <Typography
            variant="h3"
            fontSize={20}
            color="white"
            children={TranslateHelper.contactUs()}
          />
          <Typography
            variant="h1"
            color="white"
            children={TranslateHelper.contactUsHeader1()}
          />
          <Typography
            variant="h3"
            fontSize={16}
            color="white"
            children={TranslateHelper.contactUsDesc1()}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ContactBox;
