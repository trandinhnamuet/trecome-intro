'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  open: boolean;
  plan: string;
  toastShow: boolean;
  openModal: (plan?: string) => void;
  closeModal: () => void;
  showToast: () => void;
}

const ModalContext = createContext<ModalContextType>({
  open: false,
  plan: '',
  toastShow: false,
  openModal: () => {},
  closeModal: () => {},
  showToast: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; plan: string }>({ open: false, plan: '' });
  const [toastShow, setToastShow] = useState(false);

  const openModal = (plan = '') => setState({ open: true, plan });
  const closeModal = () => setState({ open: false, plan: '' });
  const showToast = () => {
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3200);
  };

  return (
    <ModalContext.Provider value={{ ...state, toastShow, openModal, closeModal, showToast }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
