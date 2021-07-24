import { Container, Spacer } from "@chakra-ui/react";
import React from "react";
import { Content } from "./Content";
import { Header } from "../Header";

type Props = {};

export const Board: React.FC<Props> = () => {
  return (
    <Container maxW="5xl" py={8} h="100vh" overflow="hidden">
      <Header />
      <Spacer h={8} />
      <Content />
    </Container>
  );
};
