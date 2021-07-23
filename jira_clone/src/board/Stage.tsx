import React from "react";
import { Flex, VStack, Wrap } from "@chakra-ui/react";
import { StageItem } from "./ItemsByStage";
import { StageType, StageItemType } from "type";

type Props = { stage: StageType };

export const Stage: React.FC<Props> = (props) => {
  const { stage } = props;
  const itemsByStage = items.filter((item) => item.stageId === stage.id);
  return (
    <VStack
      flex={1}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      h="calc(100vh - 10rem)"
      overflow="auto"
    >
      <Flex bg="gray.300" pos="sticky" top={0} w="100%" p={2} justify="center">
        {stage.title}
      </Flex>
      <Wrap w="100%" direction={"column"}>
        {itemsByStage.map((item) => (
          <StageItem key={item.id} item={item} />
        ))}
      </Wrap>
    </VStack>
  );
};

const items: StageItemType[] = [
  { id: 1, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 2, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 11, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 12, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 13, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 14, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 15, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 16, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 17, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  { id: 18, stageId: 1, title: "unok", content: "a;lsdkjf;alsdkjf;aldjf" },
  {
    id: 19,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 111,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 112,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 113,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 114,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 115,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 116,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 117,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 118,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 119,
    stageId: 2,
    title: "onara",
    content: "lsdksdfassdflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 21,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 1111,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 31,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 41,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 51,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 61,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 71,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 81,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 91,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
  {
    id: 101,
    stageId: 3,
    title: "hanaskuro",
    content: "lsdksdfassdiiijfkl;oa;ooooooooflasdfjkl;jk;ljf;alsdkjf;aldjf",
  },
];
