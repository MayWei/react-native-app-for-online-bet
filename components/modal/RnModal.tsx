import React, { ReactElement, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Body } from "../Fonts/Body";

export interface ModalOptions {
  button: ReactElement;
  timeout?: number;
}

export interface ModalCommands {
  openModal: (title: string, options?: ModalOptions) => void;
  closeModal: (callback?: () => void) => void;
}

export interface ModalProps {}

export const RnModal = React.forwardRef<ModalCommands, ModalProps>(
  (props, ref) => {
    // @ts-ignore
    const actionSheetRef = useRef<Modal>(null);
    const [title, setTitle] = useState<string>();
    const [options, setOptions] = useState<ModalOptions | null>(null);
    const [onClose, setOnClose] = useState<CallableFunction | null>();
    const timer = useRef<NodeJS.Timeout>();
    const [isVisible, setIsVisible] = useState(false);

    const handleTimeout = useCallback(() => {
      setIsVisible(false);
    }, [actionSheetRef]);

    if (ref) {
      // @ts-ignore
      ref.current = {
        openModal: (newTitle: string, modalOptions?: ModalOptions) => {
          setTitle(newTitle);
          setOptions(modalOptions || null);
          setIsVisible(true);
        },
        closeModal: (callback?: () => void) => {
          if (callback) {
            setOnClose(() => callback);
          }
          setIsVisible(false);
        },
      };
    }

    const handleOpen = () => {
      if (options?.timeout) {
        timer.current = setTimeout(handleTimeout, options?.timeout || 5000);
      }
    };

    const handleClose = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };

    return (
      <Modal
        isVisible={isVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onModalHide={handleClose}
        onShow={handleOpen}
      >
        <View style={styles.container}>
          <Body.B1 style={styles.title} semiBold>
            {title}
          </Body.B1>
          {options?.button && <View>{options.button}</View>}
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
});
