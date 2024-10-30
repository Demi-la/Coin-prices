import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { fetchCoinsData } from "./api";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import MobileCoinList from "./mobileCoinList";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [error, setError] = useState(null);

  const fetchPageData = async () => {
    setError(null);
    const start = page * 10;
    try {
      const data = await fetchCoinsData(start, 10);
      if (data) {
        setCoins(data.data);
        setTotalCoins(data.info.coins_num);
      } else {
        setError("No data received.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, [page]);

  const totalPages = Math.ceil(totalCoins / 10);

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <>
      <Box>
        {loading ? (
          <Center h="100vh">
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Center h="100vh">
            <Text color="red.500">{error}</Text>
          </Center>
        ) : totalCoins === 0 ? (
          <Center h="100vh">
            <Text>No coins available.</Text>
          </Center>
        ) : (
          <TableContainer
            w={{ base: "90%", lg: "40%" }}
            mx={"auto"}
            overflow={"hidden"}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          >
            <Box bg={"#ffffff"}>
              <Table size="sm" display={{ base: "none", md: "table" }}>
                <Thead>
                  <Tr>
                    <Th
                      textTransform="none"
                      fontWeight={"600"}
                      fontSize={"16px"}
                      border="none"
                      color={"black"}
                      py={"0.5rem"}
                    >
                      💰 Coin
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight={"600"}
                      fontSize={"16px"}
                      border="none"
                      color={"black"}
                    >
                      📄 Code
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight={"600"}
                      fontSize={"16px"}
                      border="none"
                      color={"black"}
                    >
                      🤑 Price
                    </Th>
                    <Th
                      textTransform="none"
                      fontWeight={"600"}
                      fontSize={"16px"}
                      border="none"
                      color={"black"}
                    >
                      📉 Total Supply
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {coins.map((coin, index) => (
                    <Tr
                      key={coin.id}
                      fontWeight={"400"}
                      fontSize={"14px"}
                      border="none"
                      bg={index % 2 === 1 ? "white" : "#e5e7eb"}
                    >
                      <Td border="none">{coin.name}</Td>
                      <Td border="none">{coin.symbol}</Td>
                      <Td border="none">${coin.price_usd}</Td>
                      <Td border="none">
                        {coin.tsupply} {coin.symbol}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* mobile design */}
              <Box
                spacing={4}
                display={{ base: "flex", md: "none", lg: "none" }}
              >
                <MobileCoinList
                  coins={coins}
                  handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  page={page}
                  totalPages={totalPages}
                />
              </Box>
              <Flex
                justifyContent={page > 0 ? "space-between" : "flex-end"}
                display={{ base: "none", md: "flex" }}
              >
                {page > 0 && (
                  <Button
                    type="button"
                    onClick={handlePreviousPage}
                    isDisabled={page === 0}
                    mr={2}
                    bg={"none"}
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
                    bg={"none"}
                    rightIcon={<ArrowForwardIcon />}
                    _focus={{ outline: "none", bg: "none" }}
                    _hover={"none"}
                  >
                    Next
                  </Button>
                )}
              </Flex>
            </Box>
          </TableContainer>
        )}
        ;
      </Box>
    </>
  );
}

export default CoinList;
