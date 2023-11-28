import { ReactNode } from "react";

interface DisabledCompProps {
  disabled?: boolean;
  children: ReactNode;
}

function DisabledComp(props: DisabledCompProps) {
  const { children, disabled } = props;
  return (
    <div style={{ pointerEvents: disabled ? "none" : "auto" }}>{children}</div>
  );
}

export default DisabledComp;
