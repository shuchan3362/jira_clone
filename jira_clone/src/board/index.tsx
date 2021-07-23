import { Wrap, Flex, Container, theme } from "@chakra-ui/react";
import React from "react";
import { Content } from "./Content";
import { Header } from "../Header";

type Props = {};

export const Board: React.FC<Props> = () => {
  return (
    <Container maxW="5xl" py={8}>
      <Header />
      <Content />
    </Container>
  );
};
