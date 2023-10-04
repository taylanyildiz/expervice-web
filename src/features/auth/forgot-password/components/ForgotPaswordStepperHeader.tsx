import { useForgotPassword } from "@Utils/hooks/forgot_password_hook";
import CustomStepper from "@Components/CustomStepper";

function ForgotPasswordStepperHeader() {
  const { steps, step } = useForgotPassword();
  return (
    <CustomStepper
      titles={steps.map((e) => ({
        title: e.title,
        completed: e.completed,
      }))}
      activeStep={step}
      icon={{
        defaultIcon: { backgroundColor: "grey" },
      }}
    />
  );
}

export default ForgotPasswordStepperHeader;
