import React, { useCallback, useContext } from "react";
import { Container, HStack } from "@chakra-ui/react";
import { TaskCollectionName, DefaultTaskStatusMap } from "../../constants";
import { Status } from "./Status";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { StatusItemType } from "type";
import { db } from "../../firebase";
import { calcTaskOrder } from "./util";
import { TaskContext } from "context/TaskContext";

type Props = {};

export const Content: React.FC<Props> = () => {
  const { tasks, taskStatusMap } = useContext(TaskContext);

  const onDragEnd = async (result: DropResult) => {
    const destination = result.destination;
    if (!destination) return;
    const toStatusId = Number(destination.droppableId);
    const toIndex = destination.index;
    const taskId = result.draggableId;
    const holdingTask = tasks?.find(
      (task) => task.id === taskId
    ) as StatusItemType;
    const tasksByStatus = tasks?.filter(
      (task) => task.statusId === toStatusId
    ) as StatusItemType[];
    const order = calcTaskOrder(holdingTask, tasksByStatus, toIndex);
    await updateTaskOrder(taskId, order, toStatusId);
  };

  const updateTaskOrder = useCallback(
    async (taksId: string, order: number, statusId: number) => {
      await db.collection(TaskCollectionName).doc(taksId).update({
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
          {Object.values(DefaultTaskStatusMap).map((status) => (
            <Droppable key={status.id} droppableId={String(status.id)}>
              {(provided) => (
                <Status
                  itemsByStatus={taskStatusMap[status.id]}
                  key={status.id}
                  status={status}
                  provided={provided}
                />
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </HStack>
    </Container>
  );
};
