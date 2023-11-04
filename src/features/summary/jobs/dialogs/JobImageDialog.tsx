import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@mui/material";
import { useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Colors from "@Themes/colors";
import PrimaryButton from "@Components/PrimaryButton";
import JobImage from "@Models/job/job_image";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface JobImageDialogProps {
  images: JobImage[];
}

function JobImageDialog(props: JobImageDialogProps) {
  const { images } = props;
  const maxSteps = images.length;

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        enableMouseEvents
        autoplay={false}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {images.map((image, index) => (
          <div key={index}>
            <Box
              sx={{
                height: 500,
                display: "block",
                overflow: "hidden",
                width: "100%",
              }}
              component="img"
              src={image.image_url}
            />
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ backgroundColor: Colors.selected }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <PrimaryButton
            size="small"
            fontWeight="normal"
            color="blue"
            variant="text"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            suffix={<KeyboardArrowRight />}
            children="Next"
          />
        }
        backButton={
          <PrimaryButton
            size="small"
            fontWeight="normal"
            color="blue"
            variant="text"
            onClick={handleBack}
            disabled={activeStep === 0}
            prefix={<KeyboardArrowLeft />}
            children="Back"
          />
        }
      />
    </Box>
  );
}

export default JobImageDialog;
