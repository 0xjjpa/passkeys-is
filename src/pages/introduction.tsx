import React from 'react';
import {
  Box,
  Link,
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

const About = () => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Introduction to Passkeys_
        </Heading>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          <Text mt={2} style={{ lineHeight: '1.6', letterSpacing: '0.2' }}>
            <Icon as={CiLock} mr="2" />
            Passkeys are a “new” (2020) form of authentication to simplify user experience and increase security for authentication workflows. Passkeys are built on top of the <PasskeyCode>WebAuthn</PasskeyCode> standard, a well-established (more than three years) web protocol that enables passwordless authentication. <PasskeyCode>WebAuthn</PasskeyCode> is a part of the <PasskeyCode>FIDO2</PasskeyCode> (Fast IDentity Online) project, which aims to make the internet more secure by reducing the reliance on passwords and promoting the use of stronger authentication mechanisms.
          </Text>
          <br />
          <Text mt={2} style={{ lineHeight: '1.6', letterSpacing: '0.2' }}>
            One of the key benefits of Passkeys is the elimination of the need for traditional passwords. This reduces the risks associated with password reuse, phishing, and brute-force attacks. With Passkeys, users can securely authenticate using <PasskeyCode>Face ID</PasskeyCode>, <PasskeyCode>Touch ID</PasskeyCode>, or a security key (like a <PasskeyCode>Yubikey</PasskeyCode>), which provides a more seamless and convenient experience. Within the Apple ecosystem, Passkeys are stored in <PasskeyCode>iCloud Keychain</PasskeyCode>, ensuring synchronization across devices and platforms, and offering users a consistent experience without the hassle of remembering multiple passwords.
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

export default About;
