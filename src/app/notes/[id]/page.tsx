import { fetchNote } from "@/lib/queries/note";
import { Heading } from "@chakra-ui/react";
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

  return <Heading>{note?.title}</Heading>;
}
