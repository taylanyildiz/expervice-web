import Colors from "@Themes/colors";
import { Box, Stack, Typography } from "@mui/material";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

function CustomerBox() {
  return (
    <Box width="100%" sx={{ backgroundColor: Colors.primary }}>
      <Stack alignItems="center" textAlign="center" mx={4} py={3} spacing={2}>
        <Typography
          variant="h3"
          color="white"
          children="Built for construction pros like you"
        />
        <Typography variant="subtitle2" color="white" fontWeight={100}>
          At Buildertrend, we’re always working to redefine construction for the
          modern builder.
          <p>It’s how we started – and we’re not stopping.</p>
        </Typography>
        <Box
          maxWidth={450}
          sx={{ borderRadius: 4, backgroundColor: Colors.secodary }}
          p={2}
          m={3}
          display="flex"
        >
          <Stack direction="row" spacing={1}>
            <MarkChatUnreadIcon sx={{ color: "white" }} />
            {/* Customer */}
            <Stack direction="column">
              {/* Customer Comment */}
              <Typography
                textAlign="start"
                variant="subtitle2"
                fontWeight={400}
                children="Buildertrend helped us with scalability and transparency. It’s extremely important for us to keep our clients in the loop, and Buildertrend really helps us to effectively communicate throughout the project."
              />
              {/* Customer Name */}
              <Stack mt={1} direction="row" spacing={1}>
                <Box
                  height="100%"
                  width={4}
                  sx={{ backgroundColor: "white", borderRadius: 3 }}
                />
                <Stack direction="column" alignItems="start">
                  <Typography
                    variant="h1"
                    fontSize={15}
                    children="Çetin KESKİN"
                  />
                  <Typography
                    textAlign="start"
                    children="AKE Yönetim Kurulu Başkanı"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CustomerBox;
