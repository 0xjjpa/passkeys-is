import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from "next/image";

import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { PasskeyManager } from '../components/PasskeyManager';
import { PasskeyFooter } from '../components/PasskeyFooter';
import { PASSKEYS_CAVEATS } from '../constants/passkeysCaveats';


const Caveats = () => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh" direction="column">
      <Box mb="5" mx="auto">
          <Image
            alt="Passkeys.is"
            width={36}
            height={18}
            src="/passkeys.svg"
          />
        </Box>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Passkeys' Caveats
        </Heading>
        <Text fontFamily={'Merriweather'}>
          <NextLink href='/'>Back Home_</NextLink>
        </Text>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          {
            PASSKEYS_CAVEATS.map((caveat) => (
              <Box key={caveat.id} mb="12">
                <Flex justifyContent="center" alignItems="center">
                  <Heading as="h3" size="sm" mb={3} textAlign="center">
                    {caveat.heading}
                  </Heading>
                </Flex>
                <Text mt={2}>
                  <Icon as={caveat.icon} mr="2" />
                  {caveat.content}
                </Text>
              </Box>
            ))
          }
          <Text fontFamily={'Merriweather'}>
            <NextLink href='/'>Back Home_</NextLink>
          </Text>
        </Box>
      </Main>


      <DarkModeSwitch />
      <PasskeyManager />
      <PasskeyFooter />
    </Container>
  );
};

export default Caveats;
