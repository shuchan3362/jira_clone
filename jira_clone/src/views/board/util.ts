import { StatusItemType } from "../../type";

const ORDER_INTERVAL = 10000;
const INITIAL_ORDER = 50000;

export const calcTaskOrder = (
  holdingTask: StatusItemType | undefined,
  toStatusTasks: StatusItemType[],
  toIndex: number
) => {
  if (holdingTask && toStatusTasks.includes(holdingTask)) {
    toStatusTasks = toStatusTasks.filter((task) => task.id !== holdingTask.id);
  }
  const prevTask: StatusItemType | undefined = toStatusTasks[toIndex - 1];
  const nextTask: StatusItemType | undefined = toStatusTasks[toIndex];
  return prevTask && nextTask
    ? (prevTask.order + nextTask.order) / 2
    : prevTask
    ? prevTask.order + ORDER_INTERVAL
    : nextTask
    ? nextTask.order / 2
    : INITIAL_ORDER;
};
