"use client";

import NoteDetail from "@/components/NoteDetail";
import { NoteByIdQuery } from "@/lib/graphql/generated/graphql";
import { fetchNote } from "@/lib/queries/note";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

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

  return (
    <Suspense
      fallback={
        <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      }
    >
      {note && <NoteDetail note={note} />}
    </Suspense>
  );
}
