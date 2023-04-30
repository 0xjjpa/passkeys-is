import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

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
    components: {
      Text: {
        baseStyle: {
          lineHeight: '1.6',
          letterSpacing: '0.2px'
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
