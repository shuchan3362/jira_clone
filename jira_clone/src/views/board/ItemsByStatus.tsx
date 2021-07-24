import React from "react";
import { Heading, WrapItem, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { StatusItemType } from "type";
import { Modal } from "views/Modal";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  item: StatusItemType;
  index: number;
};

export const ItemsByStatus: React.FC<Props> = (props) => {
  const { item, index } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialValues = {
    id: item.id,
    title: item.title,
    content: item.content,
    statusId: Number(item.statusId),
    order: item.order,
  };

  return (
    <>
      <Draggable key={item.id} index={index} draggableId={String(item.id)}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <WrapItem key={item.id} justifyContent="center">
              <Flex
                flexDir="column"
                border="1px"
                borderColor="gray.200"
                shadow="md"
                maxW="284px"
                p={4}
                flex={1}
                overflow="auto"
                bg="white"
                cursor="pointer"
                onClick={onOpen}
              >
                <Heading size="md">{item.title}</Heading>
                <Text>{item.content}</Text>
              </Flex>
            </WrapItem>
          </div>
        )}
      </Draggable>
      <Modal initialValues={initialValues} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
