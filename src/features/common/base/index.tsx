import { Grid, Stack, Typography } from "@mui/material";
import SolutionButtons from "./components/SolutionButtons";
import InfoImageBox from "./components/InfoImageBox";
import VideoBox from "./components/VideoBox";
import CustomerBox from "./components/CustomerBox";
import WelcomeBox from "./components/WelcomeBox";
import theme from "@Themes/index";

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
              children="Turns out, you can do it all"
            />
            <InfoImageBox
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stay-on-top_Photo.webp"
              title="Stay on top of everything in one place"
              subTitle="Put an end to questions like … “Where’s that receipt? Who made the last sales call? Which projects are framing today?” Buildertrend frees your team from admin work, so they can do more of their best work – impressing clients."
            />
            <InfoImageBox
              position="right"
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Update-clients_Photo.webp"
              title="Update clients without lifting a finger"
              subTitle="Clients crave information about the status of their build – Buildertrend gives it to them. Instead of constant emails or texts, they can see what’s happening without any extra effort from your team. Ready to put late-night phone calls in the past?"
            />
            <InfoImageBox
              image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Avoid-delays-and-errors_Photo.webp"
              title="Avoid surprise delays and costly errors"
              subTitle="When details slip through the cracks, it’s inevitable: mistakes happen. But when every change order, selection and invoice is tracked, success happens. With Buildertrend, you’ll keep a close eye on everything along the way."
            />
          </Stack>
        </Grid>
        <Grid item xs={12} children={<CustomerBox />} />
      </Grid>
    </>
  );
}

export default CommonPage;
