import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface RichTextProps {
  visibility?: boolean;
  title: ReactNode;
  content: ReactNode;
}

function RichText(props: RichTextProps) {
  let { visibility, title, content } = props;
  visibility ??= true;

  if (!visibility) return <></>;
  return (
    <Typography
      variant="h1"
      fontSize={13}
      children={
        <>
          {title} <text style={{ fontWeight: "normal" }}>{content}</text>
        </>
      }
    />
  );
}

export default RichText;
