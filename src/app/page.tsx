"use client";

import { NotesQuery } from "@/lib/graphql/generated/graphql";
import { createNote, deleteNote, updateNote } from "@/lib/mutations/notes";
import { fetchNotes } from "@/lib/queries/note";
import formatDate from "@/utils/formatDate";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  GridItem,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormNote {
  id?: number;
  title: string;
  body: string;
}

export default function Home() {
  const [notes, setNotes] = useState<NonNullable<NotesQuery["notes"]>>([]);
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

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormNote>();

  const handleClose = () => {
    onCloseModal();
    onCloseAlert();
    reset();
  };

  const onSubmit = async (params: IFormNote) => {
    try {
      if (params.id) {
        const response = await updateNote({
          id: params.id,
          title: params.title,
          body: params.body,
        });

        const newNote = response.note;
        if (newNote) {
          setNotes((prev) =>
            prev.map((note) => (note.id === params.id ? newNote : note))
          );
          toast({
            title: "Note updated.",
            description: "Your note has been updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          onCloseModal();
          reset();
        }
      } else {
        const response = await createNote({
          title: params.title,
          body: params.body,
        });

        const newNote = response.note;
        if (newNote) {
          setNotes((prev) => [newNote, ...prev]);
          toast({
            title: "Note created.",
            description: "Your note has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          onCloseModal();
          reset();
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onDelete = async () => {
    const id = getValues("id");

    try {
      if (id) {
        const response = await deleteNote({
          id: id,
        });

        const deletedNote = response.note;
        if (deletedNote) {
          setNotes((prev) => prev.filter((note) => note.id !== id));
          toast({
            title: "Note deleted.",
            description: "Your note has been deleted successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          onCloseAlert();
          reset();
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (note: IFormNote) => {
    setValue("title", note.title);
    setValue("body", note.body);
    setValue("id", note.id);
    onOpenModal();
  };

  const handleDelete = (id: number) => {
    setValue("id", id);
    onOpenAlert();
  };

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
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={8}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal isOpen={isOpenModal} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent mx={8}>
            <ModalHeader>Add Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.body}>
                <FormLabel>Body</FormLabel>
                <Textarea
                  id="body"
                  placeholder="Body"
                  {...register("body", {
                    required: "Body is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.body && errors.body.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <Flex justifyContent="space-between" w="full" alignItems="center">
        <Heading fontSize="x-large">Your Notes</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={onOpenModal}
        >
          Add
        </Button>
      </Flex>

      <SimpleGrid w="full" columns={{ md: 2, lg: 3 }} spacing="8" mt={8}>
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <Card
              key={index}
              rounded={16}
              boxShadow="md"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              minH={162}
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
          ))
        ) : notes?.length > 0 ? (
          notes.map((note) => (
            <Card
              onClick={() => router.push(`/notes/${note.id}`)}
              rounded={16}
              boxShadow="md"
              key={note.id}
              direction="row"
              overflow="hidden"
              minH={162}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(note);
                        }}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="Delete note"
                        icon={<DeleteIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(note.id);
                        }}
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
        ) : (
          <GridItem colSpan={3} w="full" h="full" textAlign="center" p={4}>
            <Text>No notes available.</Text>
          </GridItem>
        )}
      </SimpleGrid>
    </Box>
  );
}
