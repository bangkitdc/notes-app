import { ApolloError } from "@apollo/client";
import { NoteByIdQuery, NotesQuery } from "../graphql/generated/graphql";
import { getNoteByIdQuery, getNotesQuery } from "../graphql/queries";
import client from "../graphql";
import formatDate from "@/utils/formatDate";

type ReturnNotesType = {
  notes: NonNullable<NotesQuery["notes"]>
};

export const fetchNotes = async (): Promise<ReturnNotesType> => {
  try {
    const { data } = await client.query<NotesQuery>({
      query: getNotesQuery,
    });

    const notes = data.notes ?? [];

    return {
      notes
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(
        "ApolloError fetching notes:",
        error.message,
        JSON.stringify(error.graphQLErrors, null, 2),
        error.networkError
      );
    } else {
      console.error("Unexpected error fetching notes:", error);
    }
    throw new Error("Failed to fetch notes");
  }
};

type ReturnNoteType = {
  note: NoteByIdQuery["note"]
};

export const fetchNote = async (id: number): Promise<ReturnNoteType> => {
  try {
    const { data } = await client.query<NoteByIdQuery>({
      query: getNoteByIdQuery,
      variables: { id },
    });

    return {
      note: data.note
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(
        "ApolloError fetching note:",
        error.message,
        JSON.stringify(error.graphQLErrors, null, 2),
        error.networkError
      );
    } else {
      console.error("Unexpected error fetching note:", error);
    }
    throw new Error("Failed to fetch note");
  }
};
