import { ReactNode } from "react";

interface Condition2CompProps {
  firstComp: ReactNode;
  secondComp: ReactNode;
  showFirst: boolean;
}

function Condition2Comp(props: Condition2CompProps) {
  const { firstComp, secondComp, showFirst } = props;

  if (showFirst) return firstComp;
  return secondComp;
}

export default Condition2Comp;
