import {
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import MainHeading from "../components/MainHeading";

const Index = () => (
  <Container height="100vh">
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <MainHeading />
    </Flex>
    <Main>
      <Box mb="5">
        <Text mx="5" textAlign="center">An introduction to everything Passkeys from a developer perspective.</Text>
      </Box>
      <CTA />
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontFamily="mono">By 0xjjpa.</Text>
    </Footer>

  </Container>
);

export default Index;
