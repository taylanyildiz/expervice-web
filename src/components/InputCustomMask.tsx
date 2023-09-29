import { FocusEventHandler, ReactNode } from "react";
import ReactInputMask from "react-input-mask";

/// Mask props
interface MaskProps {
  mask: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  children?: ReactNode;
}

function InputCustomMask(props: MaskProps) {
  const { mask, value, placeholder, onFocus, onChange, children } = props;
  return (
    <ReactInputMask
      mask={mask}
      value={value}
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={onChange}
      children={() => children}
    />
  );
}

export default InputCustomMask;
