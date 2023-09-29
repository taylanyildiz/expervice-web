import { Grid, Typography } from "@mui/material";
import SolutionButtons from "./components/SolutionButtons";
import InfoImageBox from "./components/InfoImageBox";
import ScalableButton from "@Components/ScalableButton";
import Colors from "@Themes/colors";
import VideoBox from "./components/VideoBox";
import CustomerBox from "./components/CustomerBox";

function CommonBasePage() {
  return (
    <>
      <Grid container rowSpacing={15}>
        <Grid item xs={12}>
          <Grid container p={10} px={20}>
            <Grid item xs={6}>
              <Grid container direction="column" rowSpacing={3}>
                <Grid
                  item
                  children={
                    <Typography
                      variant="subtitle1"
                      children="EXPERVICE JOB MANAGEMENT SOFTWARE"
                    />
                  }
                />
                <Grid
                  item
                  children={
                    <Typography
                      variant="h1"
                      children="Say goodbye to constant chaos"
                    />
                  }
                />
                <Grid
                  item
                  children={
                    <Typography
                      variant="subtitle2"
                      children="Align your team. Drive growth. Impress clients. With Buildertrend construction software, you can finally work simpler and run your business – without letting it run you."
                    />
                  }
                />
                <Grid
                  item
                  children={
                    <ScalableButton
                      fontSize={18}
                      backgroundColor={Colors.secodary}
                      color={Colors.primaryDark}
                      children="Watch a free demo"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={6} children={<VideoBox />} />
          </Grid>
        </Grid>
        <Grid item xs={12} children={<SolutionButtons />} />
        <Grid item xs={12} px={20}>
          <Grid container rowSpacing={10} justifyContent="center">
            <Grid
              item
              children={
                <Typography
                  variant="h2"
                  fontSize={40}
                  children="Turns out, you can do it all"
                />
              }
            />
            <Grid item xs={12}>
              <Grid container rowSpacing={15}>
                <Grid item xs={12}>
                  <InfoImageBox
                    image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stay-on-top_Photo.webp"
                    title="Stay on top of everything in one place"
                    subTitle="Put an end to questions like … “Where’s that receipt? Who made the last sales call? Which projects are framing today?” Buildertrend frees your team from admin work, so they can do more of their best work – impressing clients."
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoImageBox
                    position="right"
                    image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Update-clients_Photo.webp"
                    title="Update clients without lifting a finger"
                    subTitle="Clients crave information about the status of their build – Buildertrend gives it to them. Instead of constant emails or texts, they can see what’s happening without any extra effort from your team. Ready to put late-night phone calls in the past?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoImageBox
                    image="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Avoid-delays-and-errors_Photo.webp"
                    title="Avoid surprise delays and costly errors"
                    subTitle="When details slip through the cracks, it’s inevitable: mistakes happen. But when every change order, selection and invoice is tracked, success happens. With Buildertrend, you’ll keep a close eye on everything along the way."
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} children={<CustomerBox />} />
      </Grid>
    </>
  );
}

export default CommonBasePage;
