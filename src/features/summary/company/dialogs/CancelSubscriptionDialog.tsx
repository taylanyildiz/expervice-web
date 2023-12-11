import LoadingComp from "@Components/LoadingComp";
import PrimaryButton from "@Components/PrimaryButton";
import TextOutlineField from "@Components/TextOutlineField";
import VisibilityComp from "@Components/VisibilityComp";
import { DialogCustomActions } from "@Components/dialogs";
import UnsubscriptionReason from "@Models/unsubscription_reason";
import ConstantRepository from "@Repo/constant_repository";
import SubscriptionRepository from "@Repo/subscription_repository";
import Colors from "@Themes/colors";
import { useDialog } from "@Utils/hooks/dialog_hook";
import { Box, DialogContent, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { useUser } from "../helper/company_helper";
import TranslateHelper from "@Local/index";

function CancelSubscriptionBox(props: {
  reason: UnsubscriptionReason;
  selected: boolean;
  onClick: () => void;
}) {
  const { selected, reason, onClick } = props;

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  const boxProps = {
    p: 1,
    border: 1,
    borderColor: selected ? Colors.selected : "divider",
    borderRadius: 1,
  };

  return (
    <Box
      {...boxProps}
      onClick={onClick}
      sx={{
        backgroundColor: selected ? Colors.selected : null,
        boxShadow: selected ? 1 : null,
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Box
          height={18}
          width={18}
          justifyContent="center"
          alignItems="center"
          display="flex"
          sx={{ backgroundColor: Colors.primaryLight, borderRadius: 1 }}
        >
          <Typography
            color="white"
            fontWeight="bold"
            fontSize={8}
            children={reason.translations.name?.[lng]}
          />
        </Box>
        <Typography children={reason.name} />
      </Stack>
    </Box>
  );
}

function CancelSubscriptionDialog(props: { onDone: (value: boolean) => void }) {
  const { onDone } = props;

  /// Destroy
  useEffect(() => {
    return () => {
      onDone(false);
    };
  }, []);

  /// Dialog hook
  const { openLoading, openConfirm, closeDialog } = useDialog();

  // Constant repository
  const constantRepo = new ConstantRepository();

  /// Reasons
  const [reasons, setReasons] = useState<UnsubscriptionReason[]>([]);

  /// Loading
  const [loading, setLoading] = useState<boolean>(true);

  /// Selected reason type
  const [selectedReason, setSelectedReason] =
    useState<UnsubscriptionReason | null>(null);

  /// Subscription respository
  const subsRepo = new SubscriptionRepository();

  /// Submit handle
  const onSubmitHandle = async (value: { description: string }) => {
    const confirm = await openConfirm(
      TranslateHelper.cancelSubscription(),
      TranslateHelper.sureCancelSubscription()
    );
    if (!confirm) return;
    const result = await openLoading(async () => {
      return subsRepo.cancelSubscription(
        selectedReason!.id!,
        value.description
      );
    });
    onDone(result);
  };

  /// Formik
  const initialValues: { description: string } = { description: "" };
  const formik = useFormik({
    initialValues,
    validationSchema: object({
      description: string().required().min(2, TranslateHelper.invalid()),
    }),
    onSubmit: onSubmitHandle,
  });

  /// Initialize component
  useEffect(() => {
    setLoading(true);
    constantRepo.getUnsubReasons().then((value) => {
      setReasons(value ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <LoadingComp loading={loading} height={300}>
      <DialogContent sx={{ p: 3, backgroundColor: "white" }}>
        <Typography
          variant="h1"
          fontSize={25}
          children={TranslateHelper.cancelSubscriptionHeader()}
        />
        <Typography
          color="grey"
          fontSize={18}
          fontWeight={"bold"}
          children={TranslateHelper.cancelSubscriptionDesc()}
        />
        <Stack mt={4} spacing={1}>
          {reasons.map((reason, index) => (
            <CancelSubscriptionBox
              key={`reasonse-${index}`}
              reason={reason}
              selected={selectedReason?.type == reason.type}
              onClick={() => {
                setSelectedReason(reason);
              }}
            />
          ))}
        </Stack>
        <VisibilityComp visibility={Boolean(selectedReason)}>
          <Box mt={2}>
            <TextOutlineField
              fullWidth
              multiline
              minRows={4}
              maxRows={4}
              name="description"
              label={TranslateHelper.description()}
              value={formik.values.description}
              helperText={
                formik.touched.description && formik.errors.description
              }
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              onChange={formik.handleChange}
            />
          </Box>
        </VisibilityComp>
      </DialogContent>
      <DialogCustomActions
        sx={{
          boxShadow: 0,
        }}
        leading={{
          visibility: true,
          children: (
            <PrimaryButton
              fontWeight="normal"
              variant="outlined"
              children={TranslateHelper.cancel()}
              onClick={closeDialog}
            />
          ),
        }}
        actions={[
          <PrimaryButton
            fontWeight="normal"
            variant="outlined"
            children={TranslateHelper.done()}
            disabled={formik.values.description.length <= 1}
            onClick={() => formik.handleSubmit()}
          />,
        ]}
      />
    </LoadingComp>
  );
}

export default CancelSubscriptionDialog;
