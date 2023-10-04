import { Box, Grid } from "@mui/material";
import ReactPlayer from "react-player";

function VideoBox() {
  return (
    <Grid container justifyContent="end">
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          className="linear-gradient"
          height={400}
          width={300}
          sx={{ borderRadius: 4 }}
        />
        <ReactPlayer
          loop
          playing
          volume={0}
          width={500}
          height={300}
          url={import.meta.env.VITE_VIDEO_URL}
          style={{
            backgroundColor: "grey",
            position: "absolute",
            marginRight: 100,
            borderRadius: 10,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default VideoBox;
