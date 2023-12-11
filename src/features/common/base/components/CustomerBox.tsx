import Colors from "@Themes/colors";
import { Box, Stack, Typography } from "@mui/material";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import TranslateHelper from "@Local/index";

function CustomerBox() {
  return (
    <Box width="100%" sx={{ backgroundColor: Colors.primary }}>
      <Stack alignItems="center" textAlign="center" mx={4} py={3} spacing={2}>
        <Typography
          variant="h3"
          color="white"
          children={TranslateHelper.buildFor()}
        />
        <Typography variant="subtitle2" color="white" fontWeight={100}>
          {TranslateHelper.buildForDesc1()}
          <p>{TranslateHelper.buildForDesc2()}</p>
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
                children={TranslateHelper.customerOptinion()}
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
