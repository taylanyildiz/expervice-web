import theme from "@Themes/index";
import { Grid, Stack, Typography } from "@mui/material";
import "aos/dist/aos.css";

interface InfoImageBoxProps {
  title: string;
  subTitle: string;
  position?: "left" | "right";
  image: string;
}

function InfoImageBox(props: InfoImageBoxProps) {
  const { title, subTitle, position, image } = props;
  const isLeft = (position ?? "left") === "left"; // Image position

  return (
    <Grid
      direction="row"
      sx={{
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
      container
      columnSpacing={8}
    >
      {isLeft && <Grid item xs children={<InfoImage image={image} />} />}
      <Grid item xs>
        <div data-aos="fade-up" data-aos-delay="100">
          <Stack direction="column" spacing={2}>
            <Typography variant="h3" textAlign="start" children={title} />
            <Typography
              variant="subtitle1"
              fontWeight="100"
              color="black"
              children={subTitle}
              textAlign="start"
            />
          </Stack>
        </div>
      </Grid>
      {!isLeft && <Grid item xs children={<InfoImage image={image} end />} />}
    </Grid>
  );
}

function InfoImage(props: { image: string; end?: boolean }) {
  const { image, end } = props;
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      style={{
        display: "flex",
        justifyContent: end ? "end" : "start",
        maxWidth: 500,
        height: 400,
        minWidth: 200,
      }}
    >
      <img
        src={image}
        style={{ position: "absolute", width: "90%", height: "70%" }}
      />
      <img
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        src="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stand-out_Pattern.svg"
      />
    </div>
  );
}
export default InfoImageBox;
