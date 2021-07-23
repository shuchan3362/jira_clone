import React, { useCallback } from "react";
import {
  Modal as ChakraModal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  const handleClick = useCallback(() => {
    onClose();
  }, []);
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={handleClick}>作成</Button>
            <Button onClick={onClose}>キャンセル</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
