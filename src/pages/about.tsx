import React from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
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
          <Text mt={2}>
            🔑 {ABOUT_PASSKEYS[0]}
          </Text>
        </Box>
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text fontFamily="mono">By 0xjjpa.</Text>
      </Footer>
    </Container>
  );
};

export default About;
