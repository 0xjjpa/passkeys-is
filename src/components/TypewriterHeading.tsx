import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const phrases = [
  "a FIDO multi-device credential.",
  "a new onboarding user flow",
  "a password replacement",
  "a webauthn authenticator",
  "a secure way to sign in",
  "the future of authentication",
  "a P256-based secret key"
];

const TypewriterAnimation = keyframes`
20%, 100% {
  width: 100%;
}
0% {
  width: 0;
}
100% {
  width: 100%;  
}
`;

const CursorAnimation = keyframes`
0% {
  visibility: hidden;
}
100% {
  visibility: initial;
}
`

const Typewriter = styled(Text)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  animation: ${TypewriterAnimation} 5s steps(20, end) 0s infinite;
`;

const Cursor = styled.span`
  margin-left: 2px;
  display: inline;
  content: " ";
  border-right: 0.15em solid currentColor;
  animation: ${CursorAnimation} 1s steps(5, end) 0s infinite;
`;

const getRandomPhrase = (excludePhrase) => {
  const filteredPhrases = phrases.filter((phrase) => phrase !== excludePhrase);
  return filteredPhrases[Math.floor(Math.random() * filteredPhrases.length)];
};

const TypewriterHeading = () => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prevPhrase) => getRandomPhrase(prevPhrase));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box textAlign="center">
      <Heading as="h1" size="lg" mb={2}>
        Passkeys is
      </Heading>
      <Flex>
        <Typewriter as="span" fontSize="xl" fontWeight="bold">
          {currentPhrase}
        </Typewriter>
        <Cursor />
      </Flex>
    </Box>
  );
};

export default TypewriterHeading;
