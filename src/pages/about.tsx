import React from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import { InfoIcon } from "@chakra-ui/icons";
import {ABOUT_PASSKEYS } from "../constants/about-passkeys";

const About = () => {
  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        About Passkeys
      </Heading>
      <SimpleGrid columns={[1,1,2,2]} spacing={10}>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <Text>🔑</Text>
          <Text fontWeight="bold" mt={4}>
            Introduction to Apple Passkeys and WebAuthn
          </Text>
          <Text mt={2}>
            {ABOUT_PASSKEYS[0]}
          </Text>
        </Box>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <InfoIcon />
          <Text fontWeight="bold" mt={4}>
            Our Technology
          </Text>
          <Text mt={2}>
            Learn about the cutting-edge technology we use.
          </Text>
        </Box>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <InfoIcon />
          <Text fontWeight="bold" mt={4}>
            Mobile Development
          </Text>
          <Text mt={2}>
            Discover our expertise in mobile app development.
          </Text>
        </Box>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <InfoIcon />
          <Text fontWeight="bold" mt={4}>
            Tools & Resources
          </Text>
          <Text mt={2}>
            Explore the tools and resources we use for our projects.
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default About;
