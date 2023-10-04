import CustomStepper from "@Components/CustomStepper";
import { useRegister } from "@Utils/hooks/register_hook";

function RegisterStepperHeader() {
  const { steps, step } = useRegister();

  return (
    <CustomStepper
      color="black"
      titles={steps}
      activeStep={step}
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
