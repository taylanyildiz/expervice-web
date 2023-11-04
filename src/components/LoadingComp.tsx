import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface LoadingCompProps {
  children?: ReactNode;
  loading: boolean;
}

function LoadingComp(props: LoadingCompProps) {
  const { children, loading } = props;

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  return <>{children}</>;
}

export default LoadingComp;
