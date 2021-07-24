import { StatusItemType } from "../../type";

const ORDER_INTERVAL = 1;
const INITIAL_ORDER = 5;

export const calcTaskOrder = (
  movedTask: StatusItemType,
  toStatusTasks: StatusItemType[],
  toIndex: number
) => {
  if (toStatusTasks.includes(movedTask)) {
    toStatusTasks = toStatusTasks.filter(
      (ticket) => ticket.id !== movedTask.id
    );
  }
  const prevTask: StatusItemType | undefined = toStatusTasks[toIndex - 1];
  const nextTask: StatusItemType | undefined = toStatusTasks[toIndex];
  return prevTask && nextTask // 先頭でも末尾でもない場合
    ? (prevTask.order + nextTask.order) / 2
    : prevTask // 末尾の場合
    ? prevTask.order + ORDER_INTERVAL
    : nextTask // 先頭の場合
    ? nextTask.order / 2
    : INITIAL_ORDER; // 先頭かつ末尾の場合(ステージ内に唯一のチケット)
};
