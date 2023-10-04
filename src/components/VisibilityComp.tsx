import { ReactNode } from "react";

interface VisibilityCompProps {
  children: ReactNode;
  visibility: boolean;
}

function VisibilityComp(props: VisibilityCompProps) {
  const { children, visibility } = props;
  if (!visibility) return <></>;
  return children;
}

export default VisibilityComp;
