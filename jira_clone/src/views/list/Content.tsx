import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import arrayMove from "array-move";

type Props = {};

export const Content: React.FC<Props> = () => {
  const [items, setItems] = useState(_items);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const newItems = arrayMove(items, startIndex, endIndex);
    setItems(newItems);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"} direction={"vertical"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable
                key={index}
                index={index}
                draggableId={String(item.id)}
              >
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title}
                  </p>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const _items = [
  { id: 1, title: "item1" },
  { id: 2, title: "item2" },
  { id: 3, title: "item3" },
  { id: 4, title: "item4" },
  { id: 5, title: "item5" },
  { id: 6, title: "item6" },
  { id: 7, title: "item7" },
  { id: 8, title: "item8" },
  { id: 9, title: "item9" },
  { id: 10, title: "item10" },
];
