import '@fontsource/merriweather/700.css'
import '@fontsource/open-sans/400.css'

import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Passkeys.is"
        description="Learn how to implement Passkeys and WebAuthn for secure authentication and authorization in your web applications."
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://passkeys.is/',
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

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
