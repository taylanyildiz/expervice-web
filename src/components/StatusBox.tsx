import { styled } from "@mui/material";
import { ReactNode } from "react";

interface BoxProps {
  active?: boolean;
  pending?: boolean;
  noEmail?: boolean;
}

const StatusColor = {
  active: { background: "#CFF8E3", text: "#265B38" },
  pending: { background: "#F8EAB7", text: "#5E350E" },
  noEmail: { background: "#C9D0D8", text: "#202227" },
};

const Box = styled("div")<{ props: BoxProps }>(({ props }) => ({
  borderRadius: 6,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 1,
  paddingBottom: 1,
  color: "white",
  fontSize: 12,
  fontWeight: "bold",
  ...(props.active && {
    backgroundColor: StatusColor.active.background,
    color: StatusColor.active.text,
  }),
  ...(props.pending && {
    backgroundColor: StatusColor.pending.background,
    color: StatusColor.pending.text,
  }),
  ...(props.noEmail && {
    backgroundColor: StatusColor.noEmail.background,
    color: StatusColor.noEmail.text,
  }),
}));

enum EStautusBox {
  NotInvited = 1,
  Invited = 2,
  Active = 3,
  Inactive = 4,
}

interface StatusBoxProps {
  status: EStautusBox;
  email: string | null | undefined;
  children?: ReactNode | null | undefined;
}

function StatusBox(props: StatusBoxProps) {
  let { children, status, email } = props;
  if (!children) {
    switch (status) {
      case EStautusBox.Active:
        children = "Active";
        break;
      case EStautusBox.Invited:
        children = "Invite Pending";
        break;
      case EStautusBox.Inactive:
        children = "Inactive";
        break;
      case EStautusBox.NotInvited:
        children = "Not Invited";
        break;
    }
    if (!email) children = "No Email";
  }
  return (
    <Box
      props={{
        active: status === EStautusBox.Active,
        pending: status === EStautusBox.Invited,
        noEmail:
          !email ||
          [EStautusBox.NotInvited, EStautusBox.Inactive].includes(status),
      }}
      children={children}
    />
  );
}

export default StatusBox;
