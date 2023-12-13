import SuccessBox from "@Components/SuccessBox";
import TranslateHelper from "@Local/index";

function SignatureSuccessBox() {
  return <SuccessBox message={TranslateHelper.signatureSuccessMessage()} />;
}

export default SignatureSuccessBox;
