import { Box } from "@chakra-ui/react";
import React from "react";
import CoinList from "./component/coinLists";

const App = () => {
  return (
    <Box w={"100%"} bg={"#e5e7eb"} minHeight={"100vh"} paddingTop={4}>
      <CoinList />
    </Box>
  );
};

export default App;
