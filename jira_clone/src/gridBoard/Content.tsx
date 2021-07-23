import {
  Box,
  Container,
  VStack,
  Wrap,
  WrapItem,
  Stack,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

export const Content: React.FC<Props> = () => {
  return (
    <Container>
      {/* <Grid
        h="xl"
        templateRows="repeat(auto-fill, minmax(100px, 1fr))"
        templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={2} bg="tomato" />
        <GridItem rowSpan={2} colSpan={2} bg="papayawhip" />
        <GridItem rowSpan={2} colSpan={2} bg="papayawhip" />
        <GridItem rowSpan={2} colSpan={2} bg="tomato" />
      </Grid> */}
      <VStack>
        <Wrap direction={"column"}>
          {items.map((item, index) => (
            <WrapItem key={index}>
              <Box>{item.title}</Box>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Container>
  );
};

const items = [
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
];
