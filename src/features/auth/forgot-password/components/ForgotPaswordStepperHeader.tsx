import { ForgotPasswordStep } from "../entities";
import CustomStepper from "@Components/CustomStepper";

interface ForgotPasswordStepperHeaderProps {
  steps: ForgotPasswordStep[];
  active: number;
}

function ForgotPasswordStepperHeader(props: ForgotPasswordStepperHeaderProps) {
  const { steps, active } = props;
  return (
    <CustomStepper
      titles={steps.map((e) => ({
        title: e.title,
        completed: e.completed,
      }))}
      activeStep={active}
      icon={{
        defaultIcon: { backgroundColor: "grey" },
      }}
    />
  );
}

export default ForgotPasswordStepperHeader;
