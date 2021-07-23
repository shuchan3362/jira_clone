import React from "react";
import { Heading, WrapItem, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { StatusItemType } from "type";
import { Modal } from "Modal";

type Props = {
  item: StatusItemType;
};

export const ItemsByStatus: React.FC<Props> = (props) => {
  const { item } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initialValues = {
    id: item.id,
    title: item.title,
    content: item.content,
    statusId: Number(item.statusId),
  };

  return (
    <>
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
      <Modal initialValues={initialValues} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
