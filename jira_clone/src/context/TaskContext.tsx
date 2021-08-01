import React, { createContext, useEffect, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { StatusItemType } from "type";
import { TaskCollectionName } from "../constants";
import { db } from "../firebase";

type TaskContextType = {
  tasks: StatusItemType[];
  setTasks: React.Dispatch<React.SetStateAction<StatusItemType[] | undefined>>;
  taskStatusMap: Record<number, StatusItemType[]>;
};

export const TaskContext = createContext({} as TaskContextType);

export const TaskContextContainer: React.FC = (props) => {
  const { children } = props;
  const [tasks, setTasks] = useState<StatusItemType[]>();
  const [data] = useCollectionDataOnce<StatusItemType>(
    db.collection(TaskCollectionName).orderBy("order"),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const taskStatusMap = tasks?.reduce<Record<number, StatusItemType[]>>(
    (acc, task) => {
      acc[task.statusId] = [...(acc[task.statusId] || []), task];
      return acc;
    },
    {}
  );

  if (!tasks || !taskStatusMap) return null;
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        taskStatusMap,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
