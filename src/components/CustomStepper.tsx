import { Check } from "@mui/icons-material";
import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { ReactNode } from "react";

interface IconProps {
  width?: number | undefined;
  height?: number | undefined;
  color?: string | undefined;
  borderRadius?: string | number;
  icon?: ReactNode | undefined;
  backgroundColor?: string | number | undefined;
  fontSize?: number | undefined;
}

interface StepperIconProps {
  activeIcon?: IconProps;
  defaultIcon?: IconProps;
  compltedIcon?: IconProps;
}

interface StepperConnector {
  line?: { color?: string; height?: number };
  active?: { color?: string };
  completed?: { color?: string };
}

interface CustomStepperProps {
  activeStep: number;
  titles: { title: string; completed: boolean }[];
  color?: string;
  icon?: StepperIconProps;
  connector?: StepperConnector;
}

const ConnectorStepper = styled(StepConnector)<{
  ownerState: { connector?: StepperConnector };
}>(({ theme, ownerState }) => {
  const { line, active, completed } = ownerState.connector ?? {};
  theme.breakpoints;
  return {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: active?.color ?? "white",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: completed?.color ?? "green",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: line?.color ?? "grey",
      borderTopWidth: line?.height ?? 2.0,
      borderRadius: 3,
    },
  };
});

/// Stepper icon styles
const IconStepper = styled("div")<{
  ownerState: { active?: boolean; iconProps?: StepperIconProps };
}>(({ theme, ownerState }) => {
  const { activeIcon, defaultIcon, compltedIcon } = ownerState.iconProps ?? {};
  return {
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: activeIcon?.color ?? "#784af4",
      backgroundColor: activeIcon?.backgroundColor as string,
    }),
    "& .completed-step": {
      color: compltedIcon?.color ?? "blue",
      backgroundColor: compltedIcon?.backgroundColor ?? "#white",
      zIndex: 1,
      fontSize: compltedIcon?.fontSize ?? 20,
    },
    "& .root-step": {
      width: defaultIcon?.width ?? 1,
      height: defaultIcon?.height ?? 1,
      borderRadius: defaultIcon?.borderRadius ?? "50%",
      backgroundColor: defaultIcon?.backgroundColor ?? "currentColor",
      color: defaultIcon?.color ?? "currentColor",
    },
  };
});

// Stepper icon
function StepperIcon(props: {
  stepIconProps: StepIconProps;
  stepperIconProps?: StepperIconProps;
}) {
  const { active, completed, className } = props.stepIconProps;
  const { activeIcon, defaultIcon, compltedIcon } =
    props.stepperIconProps ?? {};

  return (
    <IconStepper
      ownerState={{ active, iconProps: props.stepperIconProps }}
      className={className}
    >
      {completed &&
        (compltedIcon?.icon ?? <Check className="completed-step" />)}
      {active &&
        !completed &&
        (activeIcon?.icon ?? <HourglassTopIcon className="active-step" />)}
      {!completed &&
        !active &&
        (defaultIcon?.icon ?? <div className="root-step" />)}
    </IconStepper>
  );
}

function CustomStepper(props: CustomStepperProps) {
  const { activeStep, titles, icon, color, connector } = props;

  return (
    <Stepper
      activeStep={activeStep}
      connector={<ConnectorStepper ownerState={{ connector: connector }} />}
    >
      {titles.map((title, index) => (
        <Step key={index} completed={title.completed}>
          <StepLabel
            StepIconComponent={(e) => (
              <StepperIcon stepIconProps={e} stepperIconProps={icon} />
            )}
          >
            <Typography children={title.title} color={color ?? "white"} />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CustomStepper;
