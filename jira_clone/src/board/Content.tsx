import { Container, HStack } from "@chakra-ui/react";
import { DefaultTaskStageMap } from "../constants";
import React from "react";
import { Stage } from "./Stage";

type Props = {};

export const Content: React.FC<Props> = () => {
  return (
    <Container maxW="5xl" borderRadius={4} bg="gray.50" p={4}>
      <HStack align="stretch" spacing={4}>
        {Object.values(DefaultTaskStageMap).map((stage) => (
          <Stage key={stage.id} stage={stage} />
        ))}
      </HStack>
    </Container>
  );
};
