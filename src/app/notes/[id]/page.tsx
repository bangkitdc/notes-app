"use client";

import { NoteByIdQuery } from "@/lib/graphql/generated/graphql";
import { fetchNote } from "@/lib/queries/note";
import formatDate from "@/utils/formatDate";
import { ArrowLeftIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Link,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Box,
  SkeletonText,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DetailPage({ params: { id } }: PageProps) {
  const [note, setNote] = useState<NoteByIdQuery["note"]>(null);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { note } = await fetchNote(parseInt(id));
        console.log(note);
        if (note) {
          setNote(note);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Failed to fetch notes");
      }
    };

    fetch();
  }, [id, router]);

  if (!note) return null;

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
          <Flex direction="row" gap={2} alignItems="center">
            <IconButton
              onClick={() => router.push("/")}
              aria-label="Back button"
              variant="ghost"
              icon={<ChevronLeftIcon w={8} h={8} />}
            />
            <Heading>{note?.title}</Heading>
          </Flex>
          <Text fontSize="sm">
            Created at{" "}
            {formatDate(note?.createdAt, { parseToInt: true, simple: false })}
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
            <Text>{note?.body}</Text>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
