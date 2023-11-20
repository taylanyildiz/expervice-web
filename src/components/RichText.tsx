import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { VisibilityComp } from ".";

interface Props {
  fontSize?: number | string;
  fontWeight?: string | "normal" | "bold" | "normal";
  color?: string;
}

interface RichTextProps {
  visibility?: boolean;
  title: ReactNode;
  titleProps?: Props;
  content: ReactNode;
  contentProps?: Props;
  color?: string;
  fontSize?: string | number;
  spacing?: number;
}

function RichText(props: RichTextProps) {
  let {
    visibility,
    title,
    content,
    color,
    spacing,
    fontSize,
    titleProps,
    contentProps,
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
      <Grid
        direction="row"
        container
        alignItems="center"
        spacing={spacing ?? 1}
      >
        <Grid item>
          <Typography
            variant="h1"
            fontWeight={titleFontWeight}
            fontSize={titleSize}
            color={titleColor}
            children={title}
          />
        </Grid>
        <Grid item>
          <Typography
            fontSize={contentSize}
            fontWeight={contentFontWeight}
            color={contentColor}
            children={content}
          />
        </Grid>
      </Grid>
    </VisibilityComp>
  );
}

export default RichText;
