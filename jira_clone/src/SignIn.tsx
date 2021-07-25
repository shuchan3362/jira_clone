import { Box, Container, Heading } from "@chakra-ui/react";
import firebase from "./firebase";

const Signin = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <Container centerContent h={"100vh"} justifyContent={"center"}>
      <Box cursor={"pointer"} className="login" onClick={signInWithGoogle}>
        <Heading size={"md"}>Googleログイン</Heading>
      </Box>
    </Container>
  );
};

export default Signin;
