import Job from "@Models/job/job";
import { dateToFormat, openBase64PDF } from "@Utils/functions";
import {
  Box,
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import PrimaryButton from "@Components/PrimaryButton";
import JobStatusLog from "@Models/job/job_status_log";
import VisibilityComp from "@Components/VisibilityComp";
import JobRepository from "@Repo/job_repository";

interface JobStepperProps {
  job: Job | null;
  onContinue: () => void;
}

function JobStepper(props: JobStepperProps) {
  const { job, onContinue } = props;
  const steps = job?.job_statuses ?? [];

  /// Has any attachments
  const enabledAttachments = (step: JobStatusLog) => {
    return Boolean(step.form || step.images?.length !== 0);
  };

  const activeStep: JobStatusLog = steps[steps.length - 1];

  return (
    <Box
      height={500}
      display="flex"
      flexDirection="column"
      sx={{ overflow: "scroll" }}
    >
      <Grid container>
        <Grid item flex={1}>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step active key={step.id}>
                <StepLabel>
                  <Typography variant="h1" fontSize={14}>
                    {step.status?.name}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2">{step.description}</Typography>
                  <Typography variant="body2">
                    {step.creator?.first_name} {step.creator?.last_name}
                  </Typography>
                  <Typography fontSize={11} variant="body2">
                    {dateToFormat(step?.created_at)}
                  </Typography>
                  <VisibilityComp
                    visibility={enabledAttachments(step)}
                    children={
                      <Grid container>
                        <Grid item>
                          <PrimaryButton
                            onClick={() => {}}
                            padding={0}
                            variant="text"
                            fontSize={11}
                            fontWeight="normal"
                            prefix={
                              <ImageIcon sx={{ width: 15, height: 15 }} />
                            }
                            children={`(${step.images?.length ?? 0})`}
                          />
                        </Grid>
                        <Grid item>
                          <PrimaryButton
                            onClick={async () => {
                              const pdf =
                                await new JobRepository().getJobFormPdf(
                                  step!.form!.id
                                );
                              if (!pdf) return;
                              openBase64PDF(pdf);
                            }}
                            padding={0}
                            variant="text"
                            fontSize={11}
                            fontWeight="normal"
                            prefix={
                              <AttachFileIcon sx={{ width: 15, height: 15 }} />
                            }
                            children={`(${step.form ? 1 : 0})`}
                          />
                        </Grid>
                      </Grid>
                    }
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item>
          <Stack direction="column">
            <Box>
              <Typography variant="h1" fontSize={14} children="Active Step" />
              <Box width={300} boxShadow={4} mt={1} p={1}>
                <Grid container direction="row" alignItems="center">
                  <Grid item flex={1}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      fontSize={13}
                      children={activeStep.status?.name}
                    />
                    <Typography
                      variant="body2"
                      fontSize={11}
                      children={activeStep.description}
                    />
                    <Typography
                      variant="body2"
                      fontSize={11}
                      children={`${activeStep.creator?.first_name} ${activeStep.creator?.last_name}`}
                    />
                    <Typography fontSize={11} variant="body2">
                      {dateToFormat(activeStep?.created_at)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <PrimaryButton
                          padding={0}
                          variant="text"
                          fontSize={11}
                          fontWeight="normal"
                          prefix={<ImageIcon sx={{ width: 15, height: 15 }} />}
                          children={`(${activeStep.images?.length ?? 0})`}
                        />
                      </Grid>
                      <Grid item>
                        <PrimaryButton
                          padding={0}
                          variant="text"
                          fontSize={11}
                          fontWeight="normal"
                          prefix={
                            <AttachFileIcon sx={{ width: 15, height: 15 }} />
                          }
                          children={`(${activeStep.form ? 1 : 0})`}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobStepper;
