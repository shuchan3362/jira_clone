import { Container } from "@chakra-ui/react";
import { Content } from "views/gridBoard/Content";
import { Header } from "views/Header";
import React from "react";

type Props = {};

export const GridBoard: React.FC<Props> = () => {
  return (
    <Container maxW="5xl" py={8}>
      <Header />
      <Content />
    </Container>
  );
};
