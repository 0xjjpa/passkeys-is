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
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { PasskeyCode } from '../components/PasskeyCode';
import { CiLock } from 'react-icons/ci';
import { PasskeyManager } from '../components/PasskeyManager';
import { PasskeyFooter } from '../components/PasskeyFooter';

const Caveats = () => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Passkeys' Caveats
        </Heading>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          <Heading as="h3" size="sm" mb={6} textAlign="center">
            Secure context
          </Heading>
          <Text mt={2} style={{ lineHeight: '1.6', letterSpacing: '0.2' }}>
            <Icon as={CiLock} mr="2" />
            As with many cryptographic related applications, Passkeys will not be available in insecure contexts. This means that Passkeys will not be available in <PasskeyCode>HTTP</PasskeyCode> contexts, but will be available in <PasskeyCode>HTTPS</PasskeyCode> contexts. This includes <PasskeyCode>localhost</PasskeyCode>, which is not considered a secure context.
          </Text>
          <br />
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
