import Routes from "Routes";
import { ChakraProvider } from "@chakra-ui/react";
import firebase from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Signin from "SignIn";

function App() {
  const [authUser] = useAuthState(firebase.auth());
  if (!authUser) return <Signin />;
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
