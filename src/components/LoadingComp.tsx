import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface LoadingCompProps {
  children?: ReactNode;
  loading: boolean;
  height?: number | string;
}

function LoadingComp(props: LoadingCompProps) {
  const { children, loading, height } = props;

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
        <CircularProgress />
      </Box>
    );

  return <>{children}</>;
}

export default LoadingComp;
