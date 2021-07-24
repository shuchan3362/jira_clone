import React, { createContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { StatusItemType } from "type";
import { TaskCollectionName } from "../constants";
import { db } from "../firebase";

type TaskContextType = {
  tasks: StatusItemType[];
  taskStatusMap: Record<number, StatusItemType[]>;
};

export const TaskContext = createContext({} as TaskContextType);

export const TaskContextContainer: React.FC = (props) => {
  const { children } = props;
  const [tasks] = useCollectionData<StatusItemType>(
    db.collection(TaskCollectionName).orderBy("order"),
    {
      idField: "id",
    }
  );

  const taskStatusMap = tasks?.reduce<Record<number, StatusItemType[]>>(
    (acc, task) => {
      acc[task.statusId] = [...(acc[task.statusId] || []), task];
      return acc;
    },
    {}
  );

  if (!tasks || !taskStatusMap) return null;
  return (
    <TaskContext.Provider value={{ tasks, taskStatusMap }}>
      {children}
    </TaskContext.Provider>
  );
};
