import Images from "@Assets/images";
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
            children="Contact Us"
          />
          <Typography
            variant="h1"
            color="white"
            children="We’re always here for you"
          />
          <Typography
            variant="h3"
            fontSize={16}
            color="white"
            children="Our team has your back with unlimited support whenever you need it."
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ContactBox;
