import React, { useCallback, useContext } from "react";
import { Container, HStack } from "@chakra-ui/react";
import { TaskCollectionName, DefaultTaskStatusMap } from "../../constants";
import { Status } from "./Status";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { db } from "../../firebase";
import { calcTaskOrder } from "./util";
import { TaskContext } from "context/TaskContext";
import { sortBy } from "lodash";

type Props = {};

export const Content: React.FC<Props> = () => {
  const { tasks, taskStatusMap, setTasks } = useContext(TaskContext);

  const onDragEnd = async (result: DropResult) => {
    const destination = result.destination;
    if (!destination) return;
    const toStatusId = Number(destination.droppableId);
    const toIndex = destination.index;
    const taskId = result.draggableId;
    const holdingTask = tasks.find((task) => task.id === taskId);
    const tasksByStatus = tasks.filter((task) => task.statusId === toStatusId);
    const order = calcTaskOrder(holdingTask, tasksByStatus, toIndex);
    await updateTaskOrder(taskId, order, toStatusId);
  };

  const updateTaskOrder = useCallback(
    async (taskId: string, order: number, statusId: number) => {
      const params = {
        order: order,
        statusId: statusId,
      };
      await db.collection(TaskCollectionName).doc(taskId).update(params);
      setTasks((prevValues) => {
        if (prevValues) {
          const targetData = prevValues.find((value) => value.id === taskId);
          const filteredPrevValue = prevValues.filter(
            (value) => value.id !== taskId
          );
          const newData = targetData ? { ...targetData, ...params } : undefined;
          const sortedData =
            filteredPrevValue && newData
              ? sortBy([...filteredPrevValue, newData], "order")
              : [];
          return sortedData;
        }
      });
    },
    [setTasks]
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
