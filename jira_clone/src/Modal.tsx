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
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Textarea,
  FormErrorMessage,
  UseDisclosureProps,
  Select,
  useToast,
  Flex,
  theme,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { db } from "./firebase";
import { useForm } from "react-hook-form";
import { StatusItemType } from "type";
import { DefaultTaskStatusMap } from "./constants";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegClone } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  initialValues?: StatusItemType;
} & Required<Pick<UseDisclosureProps, "onClose" | "isOpen">>;

export const Modal: React.FC<Props> = (props) => {
  const { isOpen, onClose, initialValues } = props;
  const toast = useToast();
  const modalTitle = initialValues ? "タスクを編集" : "タスクを作成";

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...initialValues },
  });

  const onSubimt = handleSubmit(async (data: StatusItemType) => {
    if (initialValues) updateTask(data);
    else createTask(data);
    onClose();
    toast({
      title: `${modalTitle}しました。`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  });

  const createTask = useCallback(async (data: Omit<StatusItemType, "id">) => {
    await db.collection("statusItem").add({
      title: data.title,
      content: data.content,
      statusId: Number(data.statusId),
    });
  }, []);

  const updateTask = useCallback(
    async (data: StatusItemType) => {
      await db
        .collection("statusItem")
        .doc(initialValues?.id)
        .update({
          title: data.title,
          content: data.content,
          statusId: Number(data.statusId),
        });
    },
    [initialValues]
  );

  const deleteTask = useCallback(async () => {
    await db.collection("statusItem").doc(initialValues?.id).delete();
    onClose();
    toast({
      title: "タスクを削除しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [initialValues]);

  const cloneTask = useCallback(async () => {
    if (initialValues) {
      await createTask({
        title: initialValues.title,
        content: initialValues.content,
        statusId: initialValues.statusId,
      });
    }
    onClose();
    toast({
      title: "タスクを複製しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, []);

  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex>
          <ModalHeader flex={1}>{modalTitle}</ModalHeader>
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
        <form onSubmit={onSubimt}>
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
                作成
              </Button>
              <Button onClick={onClose}>キャンセル</Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </ChakraModal>
  );
};
