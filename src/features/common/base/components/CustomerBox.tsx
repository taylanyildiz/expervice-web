import Colors from "@Themes/colors";
import { Box, Grid, Typography } from "@mui/material";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

function CustomerBox() {
  return (
    <Box width="100%" sx={{ backgroundColor: Colors.primary }}>
      <Grid
        container
        justifyContent="center"
        textAlign="center"
        py={3}
        rowSpacing={2}
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            color="white"
            children="Built for construction pros like you"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="white" fontWeight={100}>
            At Buildertrend, we’re always working to redefine construction for
            the modern builder.
            <p>It’s how we started – and we’re not stopping.</p>
          </Typography>
        </Grid>
        <Grid item>
          <Box
            maxWidth={450}
            sx={{ borderRadius: 4, backgroundColor: Colors.secodary }}
            p={4}
          >
            <Grid container columnSpacing={5}>
              <Grid item xs={1}>
                <MarkChatUnreadIcon sx={{ color: "white" }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container rowSpacing={2}>
                  <Grid item>
                    <Typography
                      textAlign="start"
                      variant="subtitle2"
                      fontWeight={100}
                      children="Buildertrend helped us with scalability and transparency. It’s extremely important for us to keep our clients in the loop, and Buildertrend really helps us to effectively communicate throughout the project."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction="row" columnSpacing={1}>
                      <Grid item>
                        <Box
                          height="100%"
                          width={4}
                          sx={{ backgroundColor: "white", borderRadius: 3 }}
                        />
                      </Grid>
                      <Grid item>
                        <Grid container textAlign="start">
                          <Grid item xs={12}>
                            <Typography
                              variant="h1"
                              fontSize={15}
                              children="Çetin KESKİN"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography children="AKE Yönetim Kurulu Başkanı" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomerBox;
