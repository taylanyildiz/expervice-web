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
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RichText from "@Components/RichText";
import { getJobFormStatusTitle } from "../helper/job_enum_helper";
import TranslateHelper from "@Local/index";
import { useUser } from "@Features/summary/company/helper/company_helper";

interface JobStepperProps {
  job: Job | null;
  onUpdate?: (job: Job | null) => void;
}

function JobStepper(props: JobStepperProps) {
  const { job, onUpdate } = props;
  const steps = job?.job_statuses ?? [];

  /// Job statuses which has form
  const formLogs = steps.filter((e) => e.form);

  /// Job Dialog hook
  const { openJobImagesDialog, openJobFormDialog } = useJobDialog();

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  /// Dialog hook
  const { openLoading, openConfirm } = useDialog();

  /// Job helper hook
  const { availableStatus, isFault } = useJobHelper(job);

  /// Job repository
  const jobRepo = new JobRepository();

  /// Active last step
  const activeStep: JobStatusLog = steps[steps.length - 1];

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
      TranslateHelper.cancelJob(),
      TranslateHelper.sureCancelJob()
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return jobRepo.updateJobStatus(job?.id!, status);
    });
    if (!result) return;
    onUpdate?.(result);
    dispatch(setJob(result));
  };

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
        <Grid item flex={4}>
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
        <Grid item flex={3}>
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
                  children={TranslateHelper.cancelJob()}
                  onClick={handleCanceled}
                />
              </VisibilityComp>
            </Grid>
            <Grid item>
              <Typography
                variant="h1"
                fontSize={14}
                children={TranslateHelper.activeStep()}
              />
            </Grid>
            <Grid item>
              <Box width={300} boxShadow={4} p={1}>
                <Grid container direction="row" alignItems="center">
                  <Grid item flex={1}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      fontSize={13}
                      children={activeStep.status?.translations?.name?.[lng]}
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
            <Grid item xs={12}>
              <VisibilityComp visibility={formLogs.length !== 0}>
                <Grid spacing={1} container direction="column">
                  <Grid item mt={2}>
                    <Typography
                      variant="h1"
                      fontSize={13}
                      children={TranslateHelper.forms()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {formLogs.map((jobStatus, index) => {
                      const form = jobStatus.form;
                      return (
                        <Grid
                          container
                          sx={{
                            ":hover": {
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => {
                            openJobFormDialog(form!);
                          }}
                          key={`job-form-${index}`}
                          columnSpacing={1}
                          direction="row"
                          alignItems="center"
                          minHeight={40}
                        >
                          <Grid item>
                            <InsertDriveFileIcon />
                          </Grid>
                          <Grid item flex={1}>
                            <Grid container direction="column">
                              <Grid item>
                                <RichText
                                  fontSize={11}
                                  color="black"
                                  title={`${TranslateHelper.name()} :`}
                                  content={form?.form_name}
                                />
                              </Grid>
                              <Grid item>
                                <RichText
                                  fontSize={11}
                                  color="black"
                                  title={`${TranslateHelper.jobStatus()} :`}
                                  content={jobStatus?.status?.name}
                                />
                              </Grid>
                              <Grid item>
                                <RichText
                                  fontSize={11}
                                  color="black"
                                  title={`${TranslateHelper.formStatus()} :`}
                                  content={getJobFormStatusTitle(form?.status)}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </VisibilityComp>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobStepper;
