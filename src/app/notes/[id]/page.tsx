"use server";

import { fetchNote } from "@/lib/queries/note";
import formatDate from "@/utils/formatDate";
import {
  Link,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params: { id } }: PageProps) {
  const { note } = await fetchNote(parseInt(id));

  if (!note) {
    notFound();
  }

  return (
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
      position="relative"
    >
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Flex direction="row" gap={4} alignItems="center">
            <Link top={8} left={8} href="/">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="primary"
                  d="M21,11H5.41l5.3-5.29A1,1,0,1,0,9.29,4.29l-7,7a1,1,0,0,0,0,1.42l7,7a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
                ></path>
              </svg>
            </Link>
            <Heading>{note?.title}</Heading>
          </Flex>
          <Text fontSize="sm">
            Created at{" "}
            {formatDate(note.createdAt, { parseToInt: true, simple: false })}
          </Text>
        </Flex>
        <Card
          rounded={16}
          boxShadow="md"
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          minH={172}
        >
          <CardBody p={5}>
            <Text>{note.body}</Text>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
