import React from "react";
import { Heading, WrapItem, Text, Flex } from "@chakra-ui/react";
import { StageItemType } from "type";

type Props = {
  item: StageItemType;
};

export const StageItem: React.FC<Props> = (props) => {
  const { item } = props;
  return (
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
      >
        <Heading size="md">{item.title}</Heading>
        <Text>{item.content}</Text>
      </Flex>
    </WrapItem>
  );
};
