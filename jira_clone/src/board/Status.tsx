import React from "react";
import { Flex, VStack, Wrap } from "@chakra-ui/react";
import { ItemsByStatus } from "./ItemsByStatus";
import { StatusItemType, StatusType } from "type";
import { DroppableProvided } from "react-beautiful-dnd";

type Props = {
  itemsByStatus: StatusItemType[];
  status: StatusType;
  provided: DroppableProvided;
};

export const Status: React.FC<Props> = (props) => {
  const { status, provided, itemsByStatus } = props;

  return (
    <VStack
      flex={1}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      h="calc(100vh - 10rem)"
      overflow="auto"
      bg="gray.50"
    >
      <Flex
        fontWeight="bold"
        bg="gray.300"
        pos="sticky"
        top={0}
        w="100%"
        p={2}
        justify="center"
      >
        {status.title}
      </Flex>
      <Wrap
        ref={provided.innerRef}
        {...provided.droppableProps}
        w="100%"
        h="100%"
        direction={"column"}
      >
        {itemsByStatus?.map((item, index) => (
          <ItemsByStatus key={item.id} item={item} index={index} />
        ))}
        {provided.placeholder}
      </Wrap>
    </VStack>
  );
};
