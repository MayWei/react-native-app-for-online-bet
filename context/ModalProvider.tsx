import React, { PropsWithChildren, useMemo, useRef } from "react";
import {
  RnModal,
  ModalCommands,
  ModalOptions,
} from "../components/modal/RnModal";
import { createSafeContext, useSafeContext } from "./contextHelpers";

export interface ModalProviderState {
  openModal: (title: string, options?: ModalOptions) => void;
  closeModal: (callback?: () => void) => void;
}

export interface ModalProviderProps {}

const ModalContext = createSafeContext<ModalProviderState>();

export const ModalProvider = (props: PropsWithChildren<ModalProviderProps>) => {
  const { children } = props;
  const modalRef = useRef<ModalCommands>(null);

  const value = useMemo<ModalProviderState>(
    () => ({
      openModal: (title: string, options?: ModalOptions) => {
        modalRef.current?.openModal(title, options);
      },
      closeModal: (callback?: () => void) => {
        modalRef.current?.closeModal(callback);
      },
    }),
    [modalRef]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <RnModal ref={modalRef} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useSafeContext(ModalContext);
