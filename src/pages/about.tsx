import React from 'react';
import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { InfoIcon } from "@chakra-ui/icons";

const About = () => {
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2 });

  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        About Us
      </Heading>
      <SimpleGrid columns={columns} spacing={10}>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <InfoIcon />
          <Text fontWeight="bold" mt={4}>
            Our Team
          </Text>
          <Text mt={2}>
            Meet the amazing team behind our success.
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
