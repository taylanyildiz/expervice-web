import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import "aos/dist/aos.css";

/// Info Image Props
interface InfoImageBoxProps {
    title: string;
    subTitle: string;
    position?: "left" | "right";
    image?: ReactNode | string;
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
                        <Grid item children={<Typography variant="h3" children={title} />} />
                        <Grid item children={<Typography variant="subtitle1" fontWeight="100" color="black" children={subTitle} />} />
                    </Grid>
                </div>
            </Grid>
            {!isLeft && <Grid xs={6} item children={<InfoImage image={image} />} />}
        </Grid>
    )
}


function InfoImage(props: { image: string | ReactNode }) {
    return (
        <>
            <div data-aos="fade-up" data-aos-delay="200">
                <img style={{ position: "absolute" }} src={props.image as string} height={300} width={400} />
            </div>
            <img height={400} src="https://buildertrend.com/wp-content/uploads/2022/11/Value-Prop_Stand-out_Pattern.svg" />
        </>
    );
}
export default InfoImageBox;