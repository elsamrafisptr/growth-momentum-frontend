import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface FormDataType {
  age: string;
  gender: string;
  job: string;
  jobType: string;
  activity: string;
  preferences: string[];
}

interface NewUserModalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

const NewUserModalContext = createContext<NewUserModalContextType | undefined>(
  undefined
);

export const NewUserModalProvider = ({
  profile,
  children,
}: {
  profile: any;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>({
    age: "",
    gender: "",
    job: "",
    jobType: "",
    activity: "",
    preferences: [],
  });
  const [isProfileLoaded, setIsProfileLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!profile || profile.preferences?.length === 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setIsProfileLoaded(true);
  }, [profile]);

  useEffect(() => {
    if (!isProfileLoaded) return;
  }, [isProfileLoaded]);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      currentStep,
      setCurrentStep,
      formData,
      setFormData,
    }),
    [isOpen, currentStep, formData]
  );

  return (
    <NewUserModalContext.Provider value={value}>
      {children}
    </NewUserModalContext.Provider>
  );
};

export const useNewUserModal = (): NewUserModalContextType => {
  const context = useContext(NewUserModalContext);

  if (!context) {
    throw new Error(
      "useNewUserModal must be used within a NewUserModalProvider"
    );
  }

  return context;
};

export default NewUserModalContext;
