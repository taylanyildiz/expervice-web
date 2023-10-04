import { Box, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessBoxProps {
  message?: string;
  width?: number;
  height?: number;
  color?: string;
}

function SuccessBox(props?: SuccessBoxProps) {
  const { message, width, height, color } = props ?? {};
  return (
    <Grid container justifyContent="center" textAlign="center" rowSpacing={2}>
      <Grid
        item
        children={
          <Box
            p={0.1}
            sx={{
              border: `solid 1px ${color ?? "green"}`,
              borderRadius: "100%",
            }}
          >
            <CheckCircleIcon
              sx={{
                width: width ?? 100,
                height: height ?? 100,
                color: color ?? "green",
              }}
            />
          </Box>
        }
      />
      <Grid item xs={12}>
        {message ?? <Typography textAlign="end" children={message} />}
      </Grid>
    </Grid>
  );
}

export default SuccessBox;
