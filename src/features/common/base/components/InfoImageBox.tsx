import { Grid, Typography } from "@mui/material";
import "aos/dist/aos.css";

/// Info Image Props
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
    <Grid container columnSpacing={15}>
      {isLeft && <Grid xs={6} item children={<InfoImage image={image} />} />}
      <Grid item xs={6}>
        <div data-aos="fade-up" data-aos-delay="100">
          <Grid container direction="column" rowSpacing={1}>
            <Grid
              item
              children={<Typography variant="h3" children={title} />}
            />
            <Grid
              item
              children={
                <Typography
                  variant="subtitle1"
                  fontWeight="100"
                  color="black"
                  children={subTitle}
                />
              }
            />
          </Grid>
        </div>
      </Grid>
      {!isLeft && (
        <Grid item xs={6} children={<InfoImage end image={image} />} />
      )}
    </Grid>
  );
}

function InfoImage(props: { image: string; end?: boolean }) {
  const { image, end } = props;
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        style={{
          justifyContent: end ? "end" : "start",
          display: "flex",
        }}
      >
        <img
          style={{ position: "absolute" }}
          src={image}
          height={300}
          width={400}
        />
      </div>
      <img
        height={400}
        src="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stand-out_Pattern.svg"
      />
    </>
  );
}
export default InfoImageBox;
