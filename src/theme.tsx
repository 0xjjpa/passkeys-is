import { StyleFunctionProps, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'


const fonts = {
  body: `'Open Sans', sans-serif`,
  heading: `'Merriweather', serif`,
  mono: `'Menlo', monospace`,
};

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme(
  {
    styles: {
      global: (props: StyleFunctionProps) => ({
        code: {
          borderRadius: '5px',
          px: 2,
          py: 1,
          border: '1px solid #aaa',
          fontFamily: "mono",
          fontSize: "sm",
          bg: mode('rgb(237, 242, 247)', 'rgba(226, 232, 240, 0.16)')(props),
          color: mode('gray.800', 'whiteAlpha.900')(props),
        }
      })
    },
    components: {
      Text: {
        baseStyle: {
          lineHeight: '1.6',
          letterSpacing: '0.2px'
        }
      },
      Code: {
        baseStyle: {
          borderRadius: '5px',
          paddingRight: 2,
          paddingLeft: 2,
          border: '1px solid #aaa'
        }

      }
    },
    semanticTokens: {
      colors: {
        text: {
          default: "#16161D",
          _dark: "#ade3b8",
        },
        heroGradientStart: {
          default: "#7928CA",
          _dark: "#e3a7f9",
        },
        heroGradientEnd: {
          default: "#FF0080",
          _dark: "#fbec8f",
        },
      },
      radii: {
        button: "12px",
      },
    },
    colors: {
      black: "#16161D",
    },
    fonts,
    breakpoints,
  },
  withDefaultColorScheme({
    colorScheme: 'gray',
    components: ['Button'],
  }),
);

export default theme;
