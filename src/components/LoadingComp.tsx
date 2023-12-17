import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface LoadingCompProps {
  children?: ReactNode;
  loading: boolean;
  height?: number | string;
  size?: number | string;
}

function LoadingComp(props: LoadingCompProps) {
  const { children, loading, height, size } = props;

  if (loading)
    return (
      <Box
        display="flex"
        height={height ?? "100%"}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="inherit"
      >
        <CircularProgress size={size} />
      </Box>
    );

  return <>{children}</>;
}

export default LoadingComp;
