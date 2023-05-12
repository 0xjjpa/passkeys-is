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

import { Main } from '../../components/Main';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';
import { PasskeyManager } from '../../components/PasskeyManager';
import { PasskeyFooter } from '../../components/PasskeyFooter';
import { PASSKEYS_CAVEATS } from '../../constants/passkeysCaveats';
import { PasskeyImageMain } from '../../components/images/PasskeyImageMain';


const Caveats = ({ caveat }: { caveat: typeof PASSKEYS_CAVEATS[0] }) => {
  return (
    <Container height="100vh">
      <Flex justifyContent="center" alignItems="center" height="100vh" direction="column">
        <Box mb="5" mx="auto" width="48px">
          <PasskeyImageMain />
        </Box>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          {caveat.heading}
        </Heading>
        <Text fontFamily={'Merriweather'}>
          <NextLink href='/caveats'>Back to caveats_</NextLink>
        </Text>
      </Flex>
      <Main>
        <Box
          p={2}
          textAlign="left"
        >
          <Box mb="12">
            <Text mt={2} style={{ lineHeight: '2', letterSpacing: '0.2' }} dangerouslySetInnerHTML={{ __html: caveat.content }} />
          </Box>

          <Text fontFamily={'Merriweather'}>
            <NextLink href='/caveats'>Back to caveats_</NextLink>
          </Text>
        </Box>
      </Main>


      <DarkModeSwitch />
      <PasskeyManager />
      <PasskeyFooter />
    </Container>
  );
};

export async function getStaticProps({ params }) {
  // const postData = getPostData(params.id);
  const caveat = PASSKEYS_CAVEATS.find(caveat => caveat.id == params.id )
  return {
    props: {
      caveat,
    },
  };
}

export async function getStaticPaths() {
  const paths = PASSKEYS_CAVEATS.map((caveats, index) => ({
    params: {
      id: caveats.id,
      index,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Caveats;
