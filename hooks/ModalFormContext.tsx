import React, { createContext, useState, useContext, ReactNode } from "react";

interface GlobalFormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  data?: any[];
  options?: { label: string; value: number }[];
}

interface FormConfig {
  title: string;
  fields: GlobalFormField[];
  initialValues?: Record<string, any>; 
  onSubmit: ((data: Record<string, any>) => void) | null;
}

interface ModalFormContextType {
  isVisible: boolean;
  formConfig: FormConfig;
  openModal: (config: FormConfig) => void;
  closeModal: () => void;
}

const ModalFormContext = createContext<ModalFormContextType | undefined>(undefined);

interface ModalFormProviderProps {
  children: ReactNode;
}

export const ModalFormProvider: React.FC<ModalFormProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: "",
    fields: [],
    initialValues: {}, 
    onSubmit: null,
  });

  const openModal = (config: FormConfig) => {
    setFormConfig(config);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setFormConfig({ title: "", fields: [], onSubmit: null });
  };

  return (
    <ModalFormContext.Provider value={{ isVisible, formConfig, openModal, closeModal }}>
      {children}
    </ModalFormContext.Provider>
  );
};

export const useModalForm = (): ModalFormContextType => {
  const context = useContext(ModalFormContext);
  if (!context) {
    throw new Error("useModalForm must be used within a ModalFormProvider");
  }
  return context;
};
