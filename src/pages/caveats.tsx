import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  SimpleGrid,
  Tag,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { PasskeyManager } from '../components/PasskeyManager';
import { PasskeyFooter } from '../components/PasskeyFooter';
import { PASSKEYS_CAVEATS } from '../constants/passkeysCaveats';
import { PasskeyImageMain } from '../components/images/PasskeyImageMain';


const Caveats = () => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh" direction="column">
        <Box mb="5" mx="auto" width="48px">
          <PasskeyImageMain />
        </Box>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Passkeys' Caveats
        </Heading>
        <Text fontFamily={'Merriweather'}>
          <NextLink href='/'>Back to home_</NextLink>
        </Text>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          {
            PASSKEYS_CAVEATS.reverse().map((caveat, index) => (
              <Box key={caveat.id} mb="4">
                <SimpleGrid columns={1}>
                  <Flex justifyContent="left" alignItems="left">
                    <Text mr="4" fontFamily='mono'>0x{(PASSKEYS_CAVEATS.length - (index + 1)).toString(16).padStart(2, '0')}</Text>
                    <NextLink href={`/not/${caveat.id}`} style={{ display: "flex" }}>
                      <Text style={{ cursor: 'pointer' }} size="sm" textAlign="left" dangerouslySetInnerHTML={{ __html: caveat.heading }} />&nbsp;››
                      {PASSKEYS_CAVEATS.length - index == PASSKEYS_CAVEATS.length && <Tag ml='2' colorScheme='green' variant='outline' size='sm'>Latest</Tag>}
                    </NextLink>
                  </Flex>
                  <Text fontSize='xs'>{caveat.description}</Text>
                </SimpleGrid>
              </Box>
            ))
          }
          <Text fontFamily={'Merriweather'} mt={20}>
            <NextLink href='/'>Back to home_</NextLink>
          </Text>
        </Box>
      </Main>


      <DarkModeSwitch />
      <PasskeyManager />
      <PasskeyFooter />
    </Container >
  );
};

export default Caveats;
