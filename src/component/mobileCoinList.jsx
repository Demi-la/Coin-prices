import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const MobileCoinList = ({
  coins,
  handlePreviousPage,
  handleNextPage,
  page,
  totalPages,
}) => {
  return (
    <>
      <Box boxShadow="lg" border={"1px solid black"}>
        {coins.map((coin, index) => (
          <Box
            key={coin.id}
            overflow="hidden"
            p={4}
            mb={2}
            display={"grid"}
            gridTemplateColumns={"1fr 1fr"}
            bg={index % 2 === 1 ? "white" : "#e5e7eb"}
          >
            <Box>
              <Text fontWeight={"600"} fontSize={"16px"}>
                💰Coin{" "}
              </Text>
              <Text>{coin.name}</Text>
            </Box>
            <Box>
              <Text fontWeight={"600"} fontSize={"16px"}>
                📄 Code
              </Text>
              <Text>{coin.symbol}</Text>
            </Box>
            <Box>
              <Text fontWeight={"600"} fontSize={"16px"} mt={"1rem"}>
                🤑 Price:
              </Text>
              <Text>${coin.price_usd}</Text>
            </Box>
            <Box>
              <Text fontWeight={"600"} fontSize={"16px"} mt={"1rem"}>
                📉 Total Supply
              </Text>
              <Text>
                {coin.tsupply} {coin.symbol}
              </Text>
            </Box>
          </Box>
        ))}
        <Flex justifyContent={page > 0 ? "space-between" : "flex-end"} mt={4}>
          {page > 0 && (
            <Button
              type="button"
              onClick={handlePreviousPage}
              isDisabled={page === 0}
              mr={2}
              bg="none"
              leftIcon={<ArrowBackIcon />}
              _focus={{ outline: "none", bg: "none" }}
            >
              Previous
            </Button>
          )}
          {page < totalPages - 1 && (
            <Button
              type="button"
              onClick={handleNextPage}
              bg="none"
              rightIcon={<ArrowForwardIcon />}
              _focus={{ outline: "none", bg: "none" }}
              _hover="none"
            >
              Next
            </Button>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default MobileCoinList;
