import PrimaryButton from "@Components/PrimaryButton";
import { DialogCustomTitle } from "@Components/dialogs";
import JobForm from "@Models/job/job_form";
import JobRepository from "@Repo/job_repository";
import { Box, DialogContent, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EFormStatuses } from "../entities/job_enums";
import VisibilityComp from "@Components/VisibilityComp";
import { useDialog } from "@Utils/hooks/dialog_hook";
import LoadingComp from "@Components/LoadingComp";

interface JobFormDialogProps {
  form: JobForm;
}

function JobFormDialog(props: JobFormDialogProps) {
  const { form } = props;

  /// Reject button visibility
  const btnVisibility = useMemo(() => {
    return form.status === EFormStatuses.PendingConfirmed;
  }, [form.status]);

  /// Title of button
  const title: string = useMemo(() => {
    switch (form.status) {
      case EFormStatuses.Ready:
        return "Send to Customer";
      case EFormStatuses.Rejected:
        return "Send to Customer";
      case EFormStatuses.PendingConfirmed:
        return "Confirm Signature";
      case EFormStatuses.PendingSignature:
        return "Re-send to Customer";
      case EFormStatuses.Approved:
        return "Send to Customer";
      default:
        return "";
    }
  }, [form.status]);

  /// Title of button
  const desc: string = useMemo(() => {
    switch (form.status) {
      case EFormStatuses.Ready:
        return "For the customer to sign";
      case EFormStatuses.Rejected:
        return "Form rejected";
      case EFormStatuses.PendingConfirmed:
        return "Pending confirm signature";
      case EFormStatuses.PendingSignature:
        return "Pending customer signature";
      case EFormStatuses.Approved:
        return "Form approved";
      default:
        return "";
    }
  }, [form.status]);

  /// Job reposito
  const jobRepo = new JobRepository();

  /// Dialog hook
  const { openLoading, closeDialog } = useDialog();

  /// Form base64
  const [base64, setBase64] = useState<string | null>(null);
  const loading = !Boolean(base64);

  /// Initialize component
  useEffect(() => {
    const getForm = async () => {
      const base64Form = await jobRepo.getJobFormPdf(form.id);
      if (!base64Form) {
        return;
      }
      setBase64(base64Form);
    };

    getForm();
  }, [form]);

  const handleConfirm = () => {
    switch (form.status) {
      case EFormStatuses.PendingConfirmed:
        updateStatus(EFormStatuses.Approved);
        break;
      default:
        sendCustomerForm();
        break;
    }
  };

  const handleReject = () => {
    updateStatus(EFormStatuses.Rejected);
  };

  const updateStatus = async (status: number) => {
    const result = await openLoading(async () => {
      const result = await jobRepo.updateFormStatus(form.id, status);
      return result;
    });
    if (result) {
      closeDialog();
    }
  };

  const sendCustomerForm = async () => {
    const result = await openLoading(async () => {
      if (form.status === EFormStatuses.Approved)
        return await jobRepo.sendFormCustomer(form.id);
      return await jobRepo.sendFormCustomerToSign(form.id);
    });
    if (result) {
      closeDialog();
    }
  };

  return (
    <>
      <DialogCustomTitle title="Job Form" />
      <DialogContent>
        <Box height={600} mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <LoadingComp loading={loading}>
            <Grid direction="column" container height="100%" rowSpacing={1}>
              <Grid item>
                <Grid
                  container
                  columnSpacing={1}
                  justifyContent="end"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography fontSize={13} children={desc} />
                  </Grid>
                  <Grid item>
                    <PrimaryButton
                      fontWeight="normal"
                      variant="outlined"
                      children={title}
                      onClick={handleConfirm}
                    />
                  </Grid>
                  <Grid item>
                    <VisibilityComp visibility={btnVisibility}>
                      <PrimaryButton
                        fontWeight="normal"
                        variant="outlined"
                        children="Reject Signature"
                        onClick={handleReject}
                      />
                    </VisibilityComp>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item flex={1}>
                <embed
                  width="100%"
                  height="100%"
                  src={`data:application/pdf;base64,${base64}`}
                />
              </Grid>
            </Grid>
          </LoadingComp>
        </Box>
      </DialogContent>
    </>
  );
}

export default JobFormDialog;
