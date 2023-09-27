import {
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { ForgotPasswordStep } from "../entities";
import { Check } from "@mui/icons-material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

interface ForgotPasswordStepperHeaderProps {
  steps: ForgotPasswordStep[];
  active: number;
}

// Stepper icons
function StepperIcon(props: StepIconProps) {
  const { active, completed } = props;

  if (completed) {
    return <Check className="completed-step" />;
  }

  if (active) {
    return <HourglassTopIcon className="active-step" />;
  }

  return <div className="root-step" />;
}

function ForgotPasswordStepperHeader(props: ForgotPasswordStepperHeaderProps) {
  const { steps, active } = props;
  return (
    <Stepper activeStep={active}>
      {steps.map((step, index) => (
        <Step key={index} completed={step.completed}>
          <StepLabel StepIconComponent={StepperIcon}>
            <Typography children={step.title} color="white" />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default ForgotPasswordStepperHeader;
