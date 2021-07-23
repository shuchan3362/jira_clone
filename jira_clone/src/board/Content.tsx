import { Container, HStack } from "@chakra-ui/react";
import { DefaultTaskStatusMap } from "../constants";
import React from "react";
import { Status } from "./Status";

type Props = {};

export const Content: React.FC<Props> = () => {
  return (
    <Container maxW="5xl" borderRadius={4} p={4}>
      <HStack align="stretch" spacing={4}>
        {Object.values(DefaultTaskStatusMap).map((stage) => (
          <Status key={stage.id} stage={stage} />
        ))}
      </HStack>
    </Container>
  );
};
