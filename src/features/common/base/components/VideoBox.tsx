import theme from "@Themes/index";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";

function VideoBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        [theme.breakpoints.down("lg")]: {
          mt: 2,
          justifyContent: "center",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 400,
          width: 450,
        }}
      >
        <Box
          className="linear-gradient"
          height={400}
          width={300}
          sx={{
            borderRadius: 4,
            [theme.breakpoints.down("md")]: { display: "none" },
          }}
        />
        <ReactPlayer
          loop
          playing
          wrapper={({ children }) => (
            <Box
              mx={10}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
              position="absolute"
              maxWidth={500}
              overflow="hidden"
              borderRadius="4%"
              children={children}
            />
          )}
          volume={0}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          url={import.meta.env.VITE_VIDEO_URL}
        />
      </div>
    </Box>
  );
}

export default VideoBox;
