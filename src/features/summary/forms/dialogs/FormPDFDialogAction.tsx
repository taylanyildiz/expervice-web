import { DialogCustomActions } from "@Components/dialogs";
import VisibilityComp from "@Components/VisibilityComp";
import PrimaryButton from "@Components/PrimaryButton";
import { Typography } from "@mui/material";
import { dateToFormat } from "@Utils/functions";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useForm } from "../helper/form_helper";
import TranslateHelper from "@Local/index";

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
              children={TranslateHelper.delete()}
              variant="outlined"
              onClick={() => onChangedAction(EActionType.Delete)}
            />
          }
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.save()}
          onClick={() => onChangedAction(EActionType.Save)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveNew()}
          onClick={() => onChangedAction(EActionType.SaveNew)}
        />,
        <PrimaryButton
          height={30}
          fontWeight="normal"
          color="white"
          children={TranslateHelper.saveClose()}
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
