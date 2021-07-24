import React from "react";
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
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Textarea,
  FormErrorMessage,
  UseDisclosureProps,
  Select,
  Flex,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StatusItemType } from "type";
import { DefaultTaskStatusMap } from "../../constants";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegClone } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useModal } from "./useModal";

type Props = {
  initialValues?: StatusItemType;
} & Required<Pick<UseDisclosureProps, "onClose" | "isOpen">>;

export const Modal: React.FC<Props> = (props) => {
  const { isOpen, onClose, initialValues } = props;
  const modalTitle = initialValues ? "編集" : "作成";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: { ...initialValues },
  });

  const { onSubmit, deleteTask, cloneTask } = useModal({
    initialValues,
    onClose,
    handleSubmit,
  });
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex>
          <ModalHeader flex={1}>{`タスクを${modalTitle}`}</ModalHeader>
          <Flex align="center" pr={2}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BiDotsHorizontalRounded />}
                variant=""
                _hover={{ bg: theme.colors.gray[200] }}
              />
              <MenuList>
                <MenuItem icon={<FaRegClone />} onClick={cloneTask}>
                  複製
                </MenuItem>
                <MenuItem icon={<RiDeleteBin6Line />} onClick={deleteTask}>
                  削除
                </MenuItem>
              </MenuList>
            </Menu>
            <Spacer w={2} />
            <ModalCloseButton position="unset" />
          </Flex>
        </Flex>
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="stageItem" isInvalid={!!errors.title}>
              <FormLabel>タイトル</FormLabel>
              <Input
                id="title"
                {...register("title", {
                  required: "タイトルは必須です",
                })}
                autoFocus
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
              <Spacer h={4} />
              <FormLabel>内容</FormLabel>
              <Textarea id="content" {...register("content")} />
              <Spacer h={4} />
              <FormLabel>ステータス</FormLabel>
              <Select {...register("statusId")}>
                {Object.values(DefaultTaskStatusMap).map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button isLoading={isSubmitting} type="submit">
                {modalTitle}
              </Button>
              <Button onClick={onClose}>キャンセル</Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </ChakraModal>
  );
};
