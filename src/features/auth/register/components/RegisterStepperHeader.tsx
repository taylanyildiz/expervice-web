import CustomStepper from "@Components/CustomStepper";
import { RegisterStep } from "../entities";

interface RegisterStepperProps {
  steps: RegisterStep[];
  active: number;
}

function RegisterStepperHeader(props: RegisterStepperProps) {
  const { steps, active } = props;
  return (
    <CustomStepper
      color="black"
      titles={steps}
      activeStep={active}
      icon={{
        compltedIcon: { backgroundColor: "green", color: "white" },
        defaultIcon: { color: "grey" },
      }}
      connector={{
        active: { color: "grey" },
      }}
    />
  );
}

export default RegisterStepperHeader;
