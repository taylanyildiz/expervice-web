import { DialogCustomActions } from "@Components/dialogs";
import VisibilityComp from "@Components/VisibilityComp";
import PrimaryButton from "@Components/PrimaryButton";
import { Typography } from "@mui/material";
import { dateToFormat } from "@Utils/functions";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useForm } from "../helper/form_helper";

interface FormPDFDialogActionProps {
  onChanged: (type: EActionType) => void;
}

function FormPDFDialogAction(props: FormPDFDialogActionProps) {
  const { onChanged } = props;

  const { form } = useForm();
  const isEdit = Boolean(form);

  /// Changed action
  const onChangedAction = (type: EActionType) => {
    onChanged(type);
  };

  return (
    <DialogCustomActions
      actions={[
        <VisibilityComp
          visibility={isEdit}
          children={
            <PrimaryButton
              height={30}
              fontWeight="normal"
              color="black"
              children="Delete"
              variant="outlined"
              onClick={() => onChangedAction(EActionType.Delete)}
            />
          }
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children="Save"
          onClick={() => onChangedAction(EActionType.Save)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children="Save & New"
          onClick={() => onChangedAction(EActionType.SaveNew)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children="Save & Close"
          onClick={() => onChangedAction(EActionType.SaveClose)}
        />,
      ]}
      leading={{
        visibility: isEdit,
        children: (
          <Typography
            variant="body1"
            fontSize={12}
            color="grey"
            children={dateToFormat(form?.created_at)}
          />
        ),
      }}
    />
  );
}

export default FormPDFDialogAction;
