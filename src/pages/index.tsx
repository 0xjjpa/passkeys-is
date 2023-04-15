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
import MainHeading from "../components/MainHeading";
import { PasskeyManager } from "../components/PasskeyManager";
import { PasskeyFooter } from "../components/PasskeyFooter";

const Index = () => (
  <Container height="100vh">
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <MainHeading />
    </Flex>
    <Main>
      <Box mb="5">
        <Text mx="5" textAlign="center" mb="5">
          An introduction to everything Passkeys from a <Code px="1">developer</Code> perspective.
        </Text>
        <Text mx="5" textAlign="center" fontSize="xs">
          For a more generic introduction, we recommend <Link isExternal href='https://passkeys.io'>Passkeys.io</Link>
        </Text>
      </Box>
      <CTA />
    </Main>

    <DarkModeSwitch />
    <PasskeyManager />
    <PasskeyFooter />

  </Container>
);

export default Index;
