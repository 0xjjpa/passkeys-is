import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const FadeInHeader = ({ currentPhrase }: { currentPhrase: string }) => {
  const FadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 100%;  
}
`;

  const FadeInHeader = styled(Text)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  transition: opacity 0.18s;
  transform: translate3d(0, 0, 0);
  animation: ${FadeIn} 180ms steps(20, end) 0s;
`;

  return (
    <FadeInHeader as="span" fontSize="xl" fontWeight="bold">
      {currentPhrase}
    </FadeInHeader>
  )
}

const MainHeading = () => {
  const phrases = [
    "a FIDO multi-device credential.",
    "a password-less onboarding flow.",
    "a webauthn platform authenticator.",
    "an HSM-level secure credential.",
    "a P256-based keypair generator."
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  const getRandomPhrase = (excludePhrase) => {
    const filteredPhrases = phrases.filter((phrase) => phrase !== excludePhrase);
    return filteredPhrases[Math.floor(Math.random() * filteredPhrases.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prevPhrase) => getRandomPhrase(prevPhrase));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box textAlign="center" px="2">
      <Heading as="h1" size="lg" mb={2} style={{ textShadow: "1px 1px 1px #aaa" }}>
        Passkeys.is
      </Heading>
      <Flex>
        <FadeInHeader currentPhrase={currentPhrase} />
      </Flex>
    </Box>
  );
};

export default MainHeading;
