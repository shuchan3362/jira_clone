import { useCallback } from "react";
import { UseDisclosureProps, useToast } from "@chakra-ui/react";
import { db } from "../../firebase";
import { UseFormReturn } from "react-hook-form";
import { StatusItemType } from "type";
import { TaskCollectionName } from "../../constants";

type UseModal = {
  initialValues?: StatusItemType;
  handleSubmit: UseFormReturn["handleSubmit"];
  taskStatusMap?: Record<number, StatusItemType[]>;
} & Required<Pick<UseDisclosureProps, "onClose">>;

export const useModal = ({
  initialValues,
  onClose,
  handleSubmit,
  taskStatusMap,
}: UseModal) => {
  const toast = useToast();
  const modalTitle = initialValues ? "タスクを編集" : "タスクを作成";
  const firstOrderNumber = 10000;

  const onSubmit = (submitType?: string) =>
    handleSubmit(async (data: StatusItemType) => {
      if (submitType) createTask(data);
      else if (initialValues) updateTask(data);
      onClose();
      toast({
        title: `${
          submitType === "clone" ? "タスクを複製" : modalTitle
        }しました。`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });

  const createTask = useCallback(
    async (data: Omit<StatusItemType, "id" | "order">) => {
      const statusId = Number(data.statusId);
      const lastIndexOrder =
        taskStatusMap && taskStatusMap[statusId]
          ? taskStatusMap[statusId].slice(-1)[0].order
          : firstOrderNumber;
      await db.collection(TaskCollectionName).add({
        title: data.title,
        content: data.content,
        statusId: statusId,
        order: lastIndexOrder + 1,
      });
    },
    [taskStatusMap]
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

  return { onSubmit, deleteTask };
};
