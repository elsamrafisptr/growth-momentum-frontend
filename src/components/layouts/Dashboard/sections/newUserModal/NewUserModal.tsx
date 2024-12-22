import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import UserDetailForm from "./DetailForm";
import UserPreferenceForm from "./PreferenceForm";
import { useNewUserModal } from "@/context/NewUserModalContext";
import { useMemo } from "react";

const NewUserModal = () => {
  const { isOpen, setIsOpen, currentStep } = useNewUserModal();

  const renderForm = useMemo(() => {
    return currentStep === 1 ? <UserDetailForm /> : <UserPreferenceForm />;
  }, [currentStep]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[425px] [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile {currentStep}</DialogTitle>
          <DialogDescription>
            {currentStep === 1
              ? "Please complete your profile details."
              : "Set your preferences."}
          </DialogDescription>
        </DialogHeader>
        {renderForm}
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
