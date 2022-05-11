import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import axios from 'axios';

const HomePage = () => {
  const [transactionsData, setTransactions] = useState(null);

  // Fetching Data
  const getTransitionData = useCallback(() => {
    axios
      .get('http://localhost:8000/transactionsData')
      .then(result => {
        setTransactions(result?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getTransitionData();
  }, [getTransitionData]);

  // Transactions Method Handler
  const blockHandler = id => {
    let updatedList = transactionsData
      .filter(item => item.id === id)
      .map(item => {
        return { ...item, status: false };
      });

    axios.put(`http://localhost:8000/transactionsData/${id}`, updatedList[0]);

    getTransitionData();
  };

  // Transactions Method Handler
  const allowHandler = id => {
    let updatedList = transactionsData
      .filter(item => item.id === id)
      .map(item => {
        return { ...item, status: true };
      });

    axios.put(`http://localhost:8000/transactionsData/${id}`, updatedList[0]);

    getTransitionData();
  };

  return (
    <Box
      display={'flex'}
      flexFlow={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
    >
      <Heading
        as={'h1'}
        fontSize="42px"
        marginBottom={'40px'}
        marginTop={'30px'}
      >
        Suspicious Transactions
      </Heading>

      <Grid
        templateColumns={{
          base: 'repeat(12, 1fr)',
        }}
        width="100%"
      >
        <GridItem colStart={{ base: 1 }} colEnd={{ base: 4 }} />
        <GridItem colStart={{ base: 5 }} colEnd={{ base: 9 }}>
          <>
            {transactionsData !== null &&
              transactionsData?.map(item => (
                <Box
                  display={'flex'}
                  flexFlow={'column'}
                  width={'100%'}
                  minHeight={'200px'}
                  border={'1px solid #b7b7b7'}
                  padding="20px"
                  marginBottom="20px"
                  id={item?.id}
                >
                  <Grid
                    templateColumns={{
                      base: 'repeat(12, 1fr)',
                    }}
                  >
                    <GridItem colStart={{ base: 1 }} colEnd={{ base: 7 }}>
                      <Heading
                        marginBottom={'15px'}
                        fontWeight="bold"
                        color={'#6e6b6b'}
                        fontSize="18px"
                      >
                        Transaction ID: {item?.id}
                      </Heading>
                      <Text
                        marginBottom={'15px'}
                        color={'#6e6b6b'}
                        fontSize="18px"
                      >
                        From User: {item?.from}
                      </Text>
                      <Text
                        marginBottom={'15px'}
                        color={'#6e6b6b'}
                        fontSize="18px"
                      >
                        To User: {item?.to}
                      </Text>
                      <Text fontWeight="bold" color={'#6e6b6b'} fontSize="18px">
                        $ {item?.amount}
                      </Text>
                    </GridItem>

                    <GridItem colStart={{ base: 8 }} colEnd={{ base: 13 }}>
                      {item?.status !== null ? (
                        <Box
                          display={'flex'}
                          justifyContent="center"
                          alignItems={'center'}
                          height="100%"
                        >
                          <Heading
                            fontWeight="bold"
                            color={item?.status ? '#1cbdae' : '#f95a5a'}
                          >
                            {item?.status ? 'Allowed' : 'Blocked'}
                          </Heading>
                        </Box>
                      ) : (
                        <Box
                          display={'flex'}
                          justifyContent="space-around"
                          alignItems={'flex-end'}
                          height="100%"
                        >
                          <Button
                            background={'#f95a5a'}
                            _hover={{
                              background: '#f95a5a',
                            }}
                            color={'white'}
                            variant="solid"
                            onClick={() => blockHandler(item?.id)}
                          >
                            {item?.block ? 'Blocked' : 'Block'}
                          </Button>
                          <Button
                            background={'#1cbdae'}
                            _hover={{
                              background: '#1cbdae',
                            }}
                            color={'white'}
                            variant="solid"
                            onClick={() => allowHandler(item?.id)}
                          >
                            {item?.allow ? 'Allowed' : 'Allow'}
                          </Button>
                        </Box>
                      )}
                    </GridItem>
                  </Grid>
                </Box>
              ))}
          </>
        </GridItem>
        <GridItem colStart={{ base: 10 }} colEnd={{ base: 13 }} />
      </Grid>
    </Box>
  );
};

export default HomePage;
