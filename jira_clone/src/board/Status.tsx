import React from "react";
import { Flex, VStack, Wrap } from "@chakra-ui/react";
import { ItemsByStatus } from "./ItemsByStatus";
import { StatusItemType, StatusType } from "type";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

type Props = { stage: StatusType };

export const Status: React.FC<Props> = (props) => {
  const { stage } = props;
  const [items] = useCollectionData<StatusItemType>(
    db.collection("statusItem"),
    {
      idField: "id",
    }
  );
  const itemsByStage = items?.filter((item) => item.statusId === stage.id);
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
        {stage.title}
      </Flex>
      <Wrap w="100%" direction={"column"}>
        {itemsByStage?.map((item) => (
          <ItemsByStatus key={item.id} item={item} />
        ))}
      </Wrap>
    </VStack>
  );
};
