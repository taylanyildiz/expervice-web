import { Grid, Stack, Typography } from "@mui/material";
import SolutionButtons from "./components/SolutionButtons";
import InfoImageBox from "./components/InfoImageBox";
import VideoBox from "./components/VideoBox";
import CustomerBox from "./components/CustomerBox";
import WelcomeBox from "./components/WelcomeBox";
import theme from "@Themes/index";
import TranslateHelper from "@Local/index";

function CommonPage() {
  return (
    <>
      <Grid container rowSpacing={15}>
        <Grid item xs={12}>
          <Grid
            sx={{
              [theme.breakpoints.down("lg")]: { flexDirection: "column" },
            }}
            container
            p={10}
            px={10}
          >
            <Grid item xs children={<WelcomeBox />} />
            <Grid item xs children={<VideoBox />} />
          </Grid>
        </Grid>
        <Grid item xs={12} children={<SolutionButtons />} />
        <Grid item xs={12} px={20}>
          <Stack
            direction="column"
            spacing={10}
            textAlign="center"
            alignItems="center"
          >
            <Typography
              variant="h2"
              fontSize={40}
              children={TranslateHelper.turnsOutHeader()}
            />
            <InfoImageBox
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stay-on-top_Photo.webp"
              title={TranslateHelper.turnsOutHeader1()}
              subTitle={TranslateHelper.turnsOutDesc1()}
            />
            <InfoImageBox
              position="right"
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Update-clients_Photo.webp"
              title={TranslateHelper.turnsOutHeader2()}
              subTitle={TranslateHelper.turnsOutDesc2()}
            />
            <InfoImageBox
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Avoid-delays-and-errors_Photo.webp"
              title={TranslateHelper.turnsOutHeader3()}
              subTitle={TranslateHelper.turnsOutDesc3()}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} children={<CustomerBox />} />
      </Grid>
    </>
  );
}

export default CommonPage;
