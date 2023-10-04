import { RegisterStep } from "@Features/auth/register/entities";
import { ReactNode, createContext, useContext, useState } from "react";

interface RegisterContextType {
  step: number;
  steps: RegisterStep[];
  completedAll: boolean;
  onNext: () => void;
  onBack: () => void;
}

const EMPTY_FUNC = () => {};

const defaultContext: RegisterContextType = {
  step: 0,
  steps: [],
  completedAll: false,
  onNext: EMPTY_FUNC,
  onBack: EMPTY_FUNC,
};

const Context = createContext<RegisterContextType>(defaultContext);

export const useRegister = () => useContext(Context);

interface RegisterProps {
  children: ReactNode;
}

function RegisterProvider(props: RegisterProps) {
  const { children } = props;

  const [step, setStep] = useState(0);

  /// Register steps
  const [steps, setSteps] = useState<RegisterStep[]>([
    {
      title: "Contact",
      completed: false,
    },
    {
      title: "Billing",
      completed: false,
    },
    {
      title: "Finished",
      completed: false,
    },
  ]);

  const onNext = () => {
    if (step === steps.length) return;
    const values = [...steps];
    values[step].completed = true;
    setSteps(values);
    if (step === steps.length - 1) return;
    setStep((value) => ++value);
  };

  const onBack = () => {
    if (step === 0) return;
    const values = [...steps];
    values[step].completed = false;
    values[step - 1].completed = false;
    setSteps(values);
    setStep((value) => --value);
  };

  const completedAll = !steps.some((e) => !e.completed);

  const value: RegisterContextType = {
    onBack,
    onNext,
    step,
    steps,
    completedAll,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default RegisterProvider;
