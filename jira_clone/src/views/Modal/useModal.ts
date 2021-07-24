import { useCallback } from "react";
import { UseDisclosureProps, useToast } from "@chakra-ui/react";
import { db } from "../../firebase";
import { UseFormReturn } from "react-hook-form";
import { StatusItemType } from "type";
import { TaskCollectionName } from "../../constants";

type UseModal = {
  initialValues?: StatusItemType;
  handleSubmit: UseFormReturn["handleSubmit"];
} & Required<Pick<UseDisclosureProps, "onClose">>;

export const useModal = ({
  initialValues,
  onClose,
  handleSubmit,
}: UseModal) => {
  const toast = useToast();
  const modalTitle = initialValues ? "タスクを編集" : "タスクを作成";
  const firstOrderNumber = 10000;

  const onSubmit = handleSubmit(async (data: StatusItemType) => {
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

  const createTask = useCallback(
    async (data: Omit<StatusItemType, "id" | "order">) => {
      await db.collection(TaskCollectionName).add({
        title: data.title,
        content: data.content,
        statusId: Number(data.statusId),
        // order: lastIndexOrder ? lastIndexOrder + 1 : firstOrderNumber,
      });
    },
    []
  );

  const updateTask = useCallback(
    async (data: StatusItemType) => {
      await db
        .collection(TaskCollectionName)
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
    await db.collection(TaskCollectionName).doc(initialValues?.id).delete();
    onClose();
    toast({
      title: "タスクを削除しました",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [initialValues, toast, onClose]);

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
  }, [onClose, toast, createTask, initialValues]);

  return { onSubmit, deleteTask, cloneTask };
};
