import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import Head from 'next/head'
import NextLink from 'next/link';

import { Main } from '../../components/Main';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';
import { PasskeyManager } from '../../components/PasskeyManager';
import { PasskeyFooter } from '../../components/PasskeyFooter';
import { PASSKEYS_CAVEATS } from '../../constants/passkeysCaveats';
import { PasskeyImageMain } from '../../components/images/PasskeyImageMain';
import { NextSeo } from 'next-seo';


const Caveats = ({ caveat }: { caveat: typeof PASSKEYS_CAVEATS[0] }) => {
  const title = caveat?.title || caveat.heading
  return (
    <>
      <NextSeo
        title={`Passkeys.is - ${title}`}
        description={caveat.description}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: `https://passkeys.is/not/${caveat.id}`,
          siteName: 'Passkeys.is',
          images: [{
            url: 'https://passkeys.is/images/passkeys.jpg',
            width: 1200,
            height: 630,
            alt: 'Passkeys',
          }],
        }}
        twitter={{
          handle: '@0xjjpa',
          site: '@0xjjpa',
          cardType: 'summary_large_image',
        }}
      />
      <Container height="100vh">
        <Flex justifyContent="center" alignItems="center" height="100vh" direction="column">
          <Box mb="5" mx="auto" width="48px">
            <PasskeyImageMain />
          </Box>
          <SimpleGrid mb={6} textAlign='center'>
            <Heading as="h2" size="lg" textAlign="center">
              {title}
            </Heading>
            <Text>{caveat.description}</Text>
          </SimpleGrid>
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
    </>
  );
};

export async function getStaticProps({ params }) {
  // const postData = getPostData(params.id);
  const caveat = PASSKEYS_CAVEATS.find(caveat => caveat.id == params.id)
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
