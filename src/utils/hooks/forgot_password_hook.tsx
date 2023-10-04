import { ForgotPasswordStep } from "@Features/auth/forgot-password/entities";
import { ReactNode, createContext } from "react";

/// Empty function
const EMPTY_FUNC = () => {};

/// Forgot Password context type
interface ForgotPasswordContextType {
  step: number;
  steps: ForgotPasswordStep[];
  onNext: () => void;
  onBack: () => void;
}

/// Default Forgot Password context
const defaultContext: ForgotPasswordContextType = {
  step: 0,
  steps: [],
  onNext: EMPTY_FUNC,
  onBack: EMPTY_FUNC,
};

/// Forgot Password Context
const Context = createContext<ForgotPasswordContextType>(defaultContext);

/// Forgot password provider props
interface ForgotPasswordProps {
  children: ReactNode;
}

function ForgotPasswordProvider(props: ForgotPasswordProps) {
  const { children } = props;

  /// Value of context
  const value: ForgotPasswordContextType = {
    step: 0,
    steps: [],
    onBack: () => {},
    onNext: () => {},
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ForgotPasswordProvider;
