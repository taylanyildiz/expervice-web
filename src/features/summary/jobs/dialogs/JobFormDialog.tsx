import PrimaryButton from "@Components/PrimaryButton";
import { DialogCustomTitle } from "@Components/dialogs";
import JobForm from "@Models/job/job_form";
import JobRepository from "@Repo/job_repository";
import { Box, DialogContent, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EFormStatuses } from "../entities/job_enums";
import VisibilityComp from "@Components/VisibilityComp";
import { useDialog } from "@Utils/hooks/dialog_hook";
import LoadingComp from "@Components/LoadingComp";
import { useAccount } from "@Features/summary/company/helper/company_helper";
import { useJob } from "../helper/job_helper";

interface JobFormDialogProps {
  form: JobForm;
}

function JobFormDialog(props: JobFormDialogProps) {
  const { form } = props;

  /// Job store
  const { job } = useJob();

  /// Account store
  const { isInternal, isOwner } = useAccount();

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

  /// Destroy
  useEffect(() => {
    return () => {
      openLoading(async () => {
        await jobRepo.job(job!.id!);
      });
    };
  }, []);

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
    if (!result) return;
    closeDialog();
  };

  const sendCustomerForm = async () => {
    const result = await openLoading(async () => {
      if (form.status === EFormStatuses.Approved) {
        return await jobRepo.sendFormCustomer(form.id);
      }
      return await jobRepo.sendFormCustomerToSign(form.id);
    });
    if (!result) return;
    closeDialog();
  };

  return (
    <>
      <DialogCustomTitle title="Job Form" />
      <DialogContent>
        <Box height={600} mt={1} p={1} sx={{ backgroundColor: "white" }}>
          <LoadingComp loading={loading}>
            <Stack direction="column" height="100%">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h1" fontSize={15} children="FORM" />
                <VisibilityComp visibility={isOwner || isInternal}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      fontWeight={500}
                      fontSize={13}
                      children={desc}
                    />
                    <Stack direction="row" spacing={1}>
                      <PrimaryButton
                        fontWeight="normal"
                        variant="outlined"
                        children={title}
                        onClick={handleConfirm}
                      />
                      <VisibilityComp visibility={btnVisibility}>
                        <PrimaryButton
                          fontWeight="normal"
                          variant="contained"
                          backgroundColor="red"
                          color="white"
                          children="Reject Signature"
                          onClick={handleReject}
                        />
                      </VisibilityComp>
                    </Stack>
                  </Stack>
                </VisibilityComp>
              </Stack>
              <embed
                width="100%"
                height="100%"
                style={{ marginTop: 10 }}
                src={`data:application/pdf;base64,${base64}`}
              />
            </Stack>
          </LoadingComp>
        </Box>
      </DialogContent>
    </>
  );
}

export default JobFormDialog;
