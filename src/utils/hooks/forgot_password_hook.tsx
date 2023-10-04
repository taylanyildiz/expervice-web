import { ForgotPasswordStep } from "@Features/auth/forgot-password/entities";
import { ReactNode, createContext, useContext, useState } from "react";

/// Empty function
const EMPTY_FUNC = () => {};

/// Forgot Password context type
interface ForgotPasswordContextType {
  step: number;
  steps: ForgotPasswordStep[];
  completedAll: boolean;
  onNext: () => void;
  onBack: () => void;
}

/// Default Forgot Password context
const defaultContext: ForgotPasswordContextType = {
  step: 0,
  steps: [],
  completedAll: false,
  onNext: EMPTY_FUNC,
  onBack: EMPTY_FUNC,
};

/// Forgot Password Context
const Context = createContext<ForgotPasswordContextType>(defaultContext);

/// Forgot password hook
export const useForgotPassword = () => useContext(Context);

/// Forgot password provider props
interface ForgotPasswordProps {
  children: ReactNode;
}

function ForgotPasswordProvider(props: ForgotPasswordProps) {
  const { children } = props;

  /// Active page
  const [step, setStep] = useState<number>(0);

  /// Page steppers
  const [steps, setSteps] = useState<ForgotPasswordStep[]>([
    {
      title: "Reset your password",
      desc: "Please enter the email associated with your account and we'll send you an email with a password reset code to get you logged in.",
      completed: false,
    },
    {
      title: "Confirmation Code",
      desc: "Please enter the code which one we send to your email",
      completed: false,
    },
    {
      title: "Reset Password",
      desc: "Please enter password to reset",
      completed: false,
    },
  ]);

  /// On next
  const onNext = () => {
    if (step === steps.length) return;
    const values = [...steps];
    values[step].completed = true;
    setSteps(values);
    if (step === steps.length - 1) return;
    setStep((value) => ++value);
  };

  /// On next
  const onBack = () => {
    if (step === 0) return;
    const values = [...steps];
    values[step].completed = false;
    values[step - 1].completed = false;
    setSteps(values);
    setStep((value) => --value);
  };

  /// Completed all
  const completedAll = !steps.some((e) => !e.completed);

  /// Value of context
  const value: ForgotPasswordContextType = {
    step: step,
    steps: steps,
    completedAll,
    onBack: onBack,
    onNext: onNext,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ForgotPasswordProvider;
