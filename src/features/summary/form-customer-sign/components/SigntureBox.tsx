import TranslateHelper from "@Local/index";
import { FormHelperText, Stack, Typography } from "@mui/material";
import { ReactNode, forwardRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

interface SignatureBoxProps {
  error?: boolean;
  helperText?: ReactNode;
  onEnd: () => void;
}

const SignatureBox = forwardRef<any, SignatureBoxProps>((props, ref) => {
  const { onEnd, error, helperText } = props;
  return (
    <Stack>
      <Typography
        mb={1}
        variant="h1"
        fontSize={13}
        children={TranslateHelper.signature()}
      />
      <ReactSignatureCanvas
        penColor="black"
        velocityFilterWeight={1.0}
        canvasProps={{
          className: "signature",
          style: {
            border: error ? "1px solid red" : 0,
          },
        }}
        clearOnResize={false}
        ref={ref}
        onEnd={onEnd}
      />
      <FormHelperText error={error} children={helperText} />
    </Stack>
  );
});

export default SignatureBox;
