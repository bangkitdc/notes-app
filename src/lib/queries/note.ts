import { ApolloError } from "@apollo/client";
import { CreateNoteMutation, DeleteNoteMutation, NoteByIdQuery, NotesQuery, UpdateNoteMutation } from "../graphql/generated/graphql";
import { getNoteByIdQuery, getNotesQuery } from "../graphql/queries";
import client from "../graphql";
import { Note } from "@prisma/client";
import { createNoteMutation, deleteNoteMutation, updateNoteMutation } from "../graphql/mutations";

type ReturnNotesType = {
  notes: NotesQuery["notes"]
};

export const fetchNotes = async (): Promise<ReturnNotesType> => {
  try {
    const { data } = await client.query<NotesQuery>({
      query: getNotesQuery,
    });

    return {
      notes: data.notes
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

type ReturnCreateNoteType = {
  note: NoteByIdQuery["note"]
};

export const createNote = async ({ title, body }: Note): Promise<ReturnCreateNoteType> => {
  try {
    const { data } = await client.mutate<CreateNoteMutation>({
      mutation: createNoteMutation,
      variables: { title, body },
    });

    return {
      note: data?.createNote
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(
        "ApolloError creating note:",
        error.message,
        JSON.stringify(error.graphQLErrors, null, 2),
        error.networkError
      );
    } else {
      console.error("Unexpected error creating note:", error);
    }
    throw new Error("Failed to create note");
  }
};

type ReturnUpdateNoteType = {
  note: NoteByIdQuery["note"]
};

export const updateNote = async ({ id, title, body }: Note): Promise<ReturnUpdateNoteType> => {
  try {
    const { data } = await client.mutate<UpdateNoteMutation>({
      mutation: updateNoteMutation,
      variables: { id, title, body },
    });

    return {
      note: data?.updateNote
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(
        "ApolloError updating note:",
        error.message,
        JSON.stringify(error.graphQLErrors, null, 2),
        error.networkError
      );
    } else {
      console.error("Unexpected error updating note:", error);
    }
    throw new Error("Failed to update note");
  }
};

type ReturnDeleteNoteType = {
  note: NoteByIdQuery["note"]
};

export const deleteNote = async ({ id }: Note): Promise<ReturnDeleteNoteType> => {
  try {
    const { data } = await client.mutate<DeleteNoteMutation>({
      mutation: deleteNoteMutation,
      variables: { id },
    });

    return {
      note: data?.deleteNote
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error(
        "ApolloError deleting note:",
        error.message,
        JSON.stringify(error.graphQLErrors, null, 2),
        error.networkError
      );
    } else {
      console.error("Unexpected error deleting note:", error);
    }
    throw new Error("Failed to delete note");
  }
};