"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <main>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: 8, sm: 16 }}
            pt={{ base: 8, sm: 16 }}
            pb={16}
            minH="100vh"
            display="flex"
            flexDir="column"
            backgroundColor="#f9f9f9"
          >
            {children}
          </Box>
        </main>
      </ChakraProvider>
    </CacheProvider>
  );
}
