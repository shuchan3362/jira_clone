import { useCallback } from "react";
import { UseDisclosureProps, useToast } from "@chakra-ui/react";
import { db } from "../firebase";
import { useForm, UseFormReturn } from "react-hook-form";
import { StatusItemType } from "type";

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
      await db.collection("statusItem").add({
        title: data.title,
        content: data.content,
        statusId: Number(data.statusId),
      });
    },
    []
  );

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

  return { onSubmit, deleteTask, cloneTask };
};
