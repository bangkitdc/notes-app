"use client";

import { NotesQuery } from "@/lib/graphql/generated/graphql";
import { fetchNotes } from "@/lib/queries/note";
import formatDate from "@/utils/formatDate";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Spinner,
  Box,
  Heading,
  Text,
  Flex,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Button,
  SimpleGrid,
  CardHeader,
  IconButton,
  SkeletonText,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<NotesQuery["notes"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { notes } = await fetchNotes();
        if (notes) {
          setNotes(notes);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch notes");
      }
    };

    fetch();
  }, []);

  const router = useRouter();

  return (
    <Flex
      h="full"
      w="full"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="space-between" w="full">
        <Heading fontSize="x-large">Your Notes</Heading>
        <Button
          leftIcon={<AddIcon />}
          size="sm"
          colorScheme="blue"
          variant="solid"
        >
          Add
        </Button>
      </Flex>

      <SimpleGrid w="full" columns={{ sm: 2, md: 3 }} spacing="8" mt={8}>
        {isLoading ? (
          <>
            <Card
              rounded={16}
              boxShadow="md"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              minH={172}
            >
              <Stack w="full" p={4}>
                <CardHeader px={0} py={3}>
                  <SkeletonText noOfLines={1} spacing="2" skeletonHeight="3" />
                </CardHeader>

                <CardBody px={0} py={2}>
                  <SkeletonText noOfLines={2} spacing="2" skeletonHeight="4" />
                </CardBody>

                <CardFooter p={0} display="flex" justifyContent="end">
                  <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                </CardFooter>
              </Stack>
            </Card>
          </>
        ) : (
          notes?.map((note) => (
            <Card
              onClick={() => router.push(`/notes/${note.id}`)}
              rounded={16}
              boxShadow="md"
              key={note.id}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              minH={172}
              cursor="pointer"
            >
              <Stack w="full" p={4}>
                <CardHeader p={0}>
                  <Flex
                    justifyContent="space-between"
                    w="full"
                    alignItems="center"
                    gap={2}
                  >
                    <Heading size="md">{note.title}</Heading>

                    <Flex gap={2}>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="Edit note"
                        icon={<EditIcon />}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="Delete note"
                        icon={<DeleteIcon />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Flex>
                  </Flex>
                </CardHeader>

                <CardBody p={0}>
                  <Text py="2">{note.body}</Text>
                </CardBody>

                <CardFooter p={0} display="flex" justifyContent="end">
                  <Text fontSize="xs" color="gray">
                    {formatDate(note.createdAt)}
                  </Text>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )}
      </SimpleGrid>
    </Flex>
  );
}
