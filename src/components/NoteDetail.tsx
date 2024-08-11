import { NoteByIdQuery } from "@/lib/graphql/generated/graphql";
import formatDate from "@/utils/formatDate";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface NoteDetailProps {
  note: NoteByIdQuery["note"];
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note }) => {
  const router = useRouter();

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
};

export default NoteDetail;
