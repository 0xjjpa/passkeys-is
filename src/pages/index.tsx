import {
  Box,
  Text,
  Flex,
  Link,
  Code,
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
        <Text mx="5" textAlign="center" mb="2">
          An introduction to everything Passkeys from a <Code px="1">developer</Code> perspective.
        </Text>
        <Text mx="5" textAlign="center" fontSize="xs">
          For a more generic introduction, we recommend <Link isExternal href='https://passkeys.io'>Passkeys.io</Link>
        </Text>
      </Box>
      <CTA />
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text fontFamily="mono">By <Link isExternal href='https://twitter.com/0xjjpa'>0xjjpa</Link>.</Text>
    </Footer>

  </Container>
);

export default Index;
