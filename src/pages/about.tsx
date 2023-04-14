import React from 'react';
import {
  Box,
  Link,
  Container,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ABOUT_PASSKEYS } from "../constants/about-passkeys";
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';

const About = () => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          About Passkeys_
        </Heading>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          <Text mt={2} style={{ lineHeight: '1.6', letterSpacing: '0.2' }}>
            🔑 {ABOUT_PASSKEYS[0]}
          </Text>
          <br />
          <Text fontFamily={'Merriweather'}>
            <NextLink href='/'>Back Home_</NextLink>
          </Text>
        </Box>
      </Main>


      <DarkModeSwitch />
      <Footer>
        <Text fontFamily="mono">By <Link isExternal href='https://twitter.com/0xjjpa'>0xjjpa</Link>.</Text>
      </Footer>
    </Container>
  );
};

export default About;
