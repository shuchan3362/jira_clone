import React, { useCallback } from "react";
import { UseDisclosureProps, useToast } from "@chakra-ui/react";
import { db } from "../../firebase";
import { UseFormReturn } from "react-hook-form";
import { StatusItemType } from "type";
import { TaskCollectionName } from "../../constants";
import { sortBy } from "lodash";

type UseModal = {
  initialValues?: StatusItemType;
  handleSubmit: UseFormReturn["handleSubmit"];
  taskStatusMap?: Record<number, StatusItemType[]>;
  setTasks: React.Dispatch<React.SetStateAction<StatusItemType[] | undefined>>;
} & Required<Pick<UseDisclosureProps, "onClose">>;

export const useModal = ({
  initialValues,
  onClose,
  handleSubmit,
  taskStatusMap,
  setTasks,
}: UseModal) => {
  const toast = useToast();
  const modalTitle = initialValues ? "タスクを編集" : "タスクを作成";
  const firstOrderNumber = 10000;

  const onSubmit = (submitType?: string) =>
    handleSubmit(async (data: StatusItemType) => {
      if (submitType === "clone") createTask(data);
      else if (initialValues) updateTask(data);
      else if (submitType) createTask(data);
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
      const res = await db.collection(TaskCollectionName).add({
        title: data.title,
        content: data.content,
        statusId: statusId,
        order: lastIndexOrder + 1,
      });
      const newData = (await res.get()).data() as StatusItemType;
      setTasks((prevValue) => {
        return prevValue ? [...prevValue, newData] : [];
      });
    },
    [taskStatusMap]
  );

  const updateTask = useCallback(
    async (data: StatusItemType) => {
      const params = {
        title: data.title,
        content: data.content,
        statusId: Number(data.statusId),
      };
      await db
        .collection(TaskCollectionName)
        .doc(initialValues?.id)
        .update(params);
      setTasks((prevValues) => {
        const targetData = prevValues?.find(
          (value) => value.id === initialValues?.id
        );
        const filteredPrevValue = prevValues?.filter(
          (value) => value.id !== initialValues?.id
        );
        const newData = targetData ? { ...targetData, ...params } : undefined;
        return filteredPrevValue && newData
          ? sortBy([...filteredPrevValue, newData], "order")
          : [];
      });
    },
    [initialValues]
  );

  const deleteTask = useCallback(async () => {
    await db.collection(TaskCollectionName).doc(initialValues?.id).delete();
    setTasks((prevValues) => {
      const existingValues = prevValues?.filter(
        (value) => value.id !== initialValues?.id
      );
      return existingValues;
    });
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
