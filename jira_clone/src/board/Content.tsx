import React, { useCallback } from "react";
import { Container, HStack } from "@chakra-ui/react";
import { DefaultTaskStatusMap } from "../constants";
import { Status } from "./Status";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { StatusItemType } from "type";
import { db } from "../firebase";
import { calcTaskOrder } from "./util";

type Props = {};

export const Content: React.FC<Props> = () => {
  const [items] = useCollectionData<StatusItemType>(
    db.collection("statusItem").orderBy("order"),
    {
      idField: "id",
    }
  );

  const onDragEnd = async (result: DropResult) => {
    const destination = result.destination;
    const source = result.source;
    if (!destination) return;
    const fromStatusId = Number(source.droppableId);
    const fromIndex = source.index;
    const toStatusId = Number(destination.droppableId);
    const toIndex = destination.index;
    const taskId = result.draggableId;
    const holdingTask = items?.find(
      (item) => item.id === taskId
    ) as StatusItemType;
    const tasksByStatus = items?.filter(
      (item) => item.statusId === toStatusId
    ) as StatusItemType[];
    const order = calcTaskOrder(holdingTask, tasksByStatus, toIndex);
    await updateTaskOrder(taskId, order, toStatusId);
  };

  const updateTaskOrder = useCallback(
    async (taksId: string, order: number, statusId: number) => {
      await db.collection("statusItem").doc(taksId).update({
        order: order,
        statusId: statusId,
      });
    },
    []
  );

  return (
    <Container maxW="5xl" borderRadius={4} p={4}>
      <HStack align="stretch" spacing={4}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(DefaultTaskStatusMap).map((status) => {
            const itemsByStatus = items?.filter(
              (item) => item.statusId === status.id
            ) as StatusItemType[];
            return (
              <Droppable key={status.id} droppableId={String(status.id)}>
                {(provided) => (
                  <Status
                    itemsByStatus={itemsByStatus}
                    key={status.id}
                    status={status}
                    provided={provided}
                  />
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </HStack>
    </Container>
  );
};
