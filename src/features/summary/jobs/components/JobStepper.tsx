import Job from "@Models/job/job";
import { dateToFormat } from "@Utils/functions";
import {
  Box,
  Grid,
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
import { useJobDialog, useJobHelper } from "../helper/job_helper";
import { EJobStatuses } from "../entities/job_enums";
import { useDialog } from "@Utils/hooks/dialog_hook";
import JobRepository from "@Repo/job_repository";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@Store/index";
import { setJob } from "@Store/job_store";

interface JobStepperProps {
  job: Job | null;
  onUpdate?: (job: Job | null) => void;
}

function JobStepper(props: JobStepperProps) {
  const { job, onUpdate } = props;
  const steps = job?.job_statuses ?? [];

  /// Job Dialog hook
  const { openJobImagesDialog, openJobFormDialog } = useJobDialog();

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Job helper hook
  const { availableStatus, isFault } = useJobHelper(job);

  /// Job repository
  const jobRepo = new JobRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Has any attachments
  const enabledAttachments = (step: JobStatusLog) => {
    return Boolean(step.form || step.images?.length !== 0);
  };

  /// Canceled job
  const handleCanceled = async () => {
    let status = EJobStatuses.FaultCanceled;
    if (!isFault) status = EJobStatuses.MaintenanceCanceled;
    const confirm = await openConfirm(
      "Canceled Job",
      "Are you sure to canceled job"
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return jobRepo.updateJobStatus(job?.id!, status);
    });
    if (!result) return;
    onUpdate?.(result);
    dispatch(setJob(result));
  };

  /// Active last step
  const activeStep: JobStatusLog = steps[steps.length - 1];

  /// Attachments
  const attachements = (step: JobStatusLog) => {
    return (
      <Grid container>
        <Grid item>
          <PrimaryButton
            onClick={() => {
              if (!step.images || step.images.length === 0) return;
              openJobImagesDialog(step.images);
            }}
            padding={0}
            variant="text"
            fontSize={11}
            fontWeight="normal"
            prefix={<ImageIcon sx={{ width: 15, height: 15 }} />}
            children={`(${step.images?.length ?? 0})`}
          />
        </Grid>
        <Grid item>
          <PrimaryButton
            onClick={async () => {
              if (!step.form) return;
              openJobFormDialog(step.form);
            }}
            padding={0}
            variant="text"
            fontSize={11}
            fontWeight="normal"
            prefix={<AttachFileIcon sx={{ width: 15, height: 15 }} />}
            children={`(${step.form ? 1 : 0})`}
          />
        </Grid>
      </Grid>
    );
  };

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
            {steps.map((step) => (
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
                    children={attachements(step)}
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            rowSpacing={1}
            justifyContent="end"
          >
            <Grid item display="flex" justifyContent="end">
              <VisibilityComp visibility={availableStatus}>
                <PrimaryButton
                  variant="outlined"
                  fontWeight="normal"
                  fontSize={12}
                  children="Cancel Job"
                  onClick={handleCanceled}
                />
              </VisibilityComp>
            </Grid>
            <Grid item>
              <Typography variant="h1" fontSize={14} children="Active Step" />
            </Grid>
            <Grid item>
              <Box width={300} boxShadow={4} p={1}>
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
                    <Typography
                      fontSize={11}
                      variant="body2"
                      children={dateToFormat(activeStep?.created_at)}
                    />
                  </Grid>
                  {attachements(activeStep)}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobStepper;
