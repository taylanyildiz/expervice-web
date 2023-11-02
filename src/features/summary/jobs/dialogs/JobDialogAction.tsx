import { DialogCustomActions } from "@Components/dialogs";
import VisibilityComp from "@Components/VisibilityComp";
import PrimaryButton from "@Components/PrimaryButton";
import { Avatar, Grid, Typography } from "@mui/material";
import { caption, dateToFormat } from "@Utils/functions";
import { EActionType } from "@Components/dialogs/DialogCustomActions";
import { useJob } from "../helper/job_helper";

interface JobDialogActionProps {
  onChanged: (type: EActionType) => void;
}

function JobDialogAction(props: JobDialogActionProps) {
  const { onChanged } = props;

  const { job } = useJob();
  const isEdit = Boolean(job);
  const creatorDisplayName = `${job?.creator?.first_name} ${job?.creator?.last_name}`;

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
                children={dateToFormat(job?.created_at)}
              />
            </Grid>
          </Grid>
        ),
      }}
    />
  );
}

export default JobDialogAction;
