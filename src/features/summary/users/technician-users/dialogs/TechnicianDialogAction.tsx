import { DialogCustomActions } from "@Components/dialogs";
import VisibilityComp from "@Components/VisibilityComp";
import PrimaryButton from "@Components/PrimaryButton";
import { Avatar, Grid, Typography } from "@mui/material";
import { caption, dateToFormat } from "@Utils/functions";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useTechnician } from "../helper/technician_helper";

interface CustomerDialogActionProps {
  onChanged: (type: EActionType) => void;
}

function TechnicianDialogAction(props: CustomerDialogActionProps) {
  const { onChanged } = props;

  const { technician } = useTechnician();
  const isEdit = Boolean(technician);
  const creatorDisplayName = `${technician?.creator?.first_name} ${technician?.creator?.last_name}`;

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
          <Grid container alignItems="center" columnSpacing={1}>
            <Grid item>
              <Typography
                variant="body1"
                fontSize={12}
                color="grey"
                children={`Created by ${creatorDisplayName}`}
              />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  height: 30,
                  width: 30,
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "grey",
                }}
                children={caption(creatorDisplayName)}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontSize={12}
                color="grey"
                children={dateToFormat(technician?.created_at)}
              />
            </Grid>
          </Grid>
        ),
      }}
    />
  );
}

export default TechnicianDialogAction;
