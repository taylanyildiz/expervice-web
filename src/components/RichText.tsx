import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { VisibilityComp } from ".";

interface Props {
  fontSize?: number | string;
  fontWeight?: string | "normal" | "bold" | "normal";
  color?: string;
}

interface RichTextProps {
  visibility?: boolean;
  title?: ReactNode;
  titleProps?: Props;
  content: ReactNode;
  contentProps?: Props;
  color?: string;
  fontSize?: string | number;
  spacing?: number;
  alignItems?: "center" | "start";
}

function RichText(props: RichTextProps) {
  let {
    visibility,
    title,
    content,
    color,
    fontSize,
    titleProps,
    contentProps,
    alignItems,
  } = props;
  visibility ??= true;

  const titleSize = titleProps?.fontSize ?? fontSize ?? 13;
  const titleColor = titleProps?.color ?? color ?? "white";
  const titleFontWeight = titleProps?.fontWeight ?? "bold";

  const contentSize = contentProps?.fontSize ?? fontSize ?? 13;
  const contentColor = contentProps?.color ?? color ?? "white";
  const contentFontWeight = contentProps?.fontWeight ?? "normal";

  return (
    <VisibilityComp visibility={visibility}>
      <Typography
        variant="h1"
        fontWeight={titleFontWeight}
        fontSize={titleSize}
        color={titleColor}
        alignItems={alignItems}
        children={
          <>
            {title}{" "}
            <span
              style={{
                fontSize: contentSize,
                fontWeight: contentFontWeight,
                color: contentColor,
              }}
            >
              {content}
            </span>
          </>
        }
      />
    </VisibilityComp>
  );
}

export default RichText;
