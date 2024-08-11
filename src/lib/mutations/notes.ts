
import { Note } from "@prisma/client";
import { createNoteMutation, deleteNoteMutation, updateNoteMutation } from "../graphql/mutations";
import { ApolloError } from "@apollo/client";
import { CreateNoteMutation, DeleteNoteMutation, NoteByIdQuery, NotesQuery, UpdateNoteMutation } from "../graphql/generated/graphql";
import client from "../graphql";


type ReturnCreateNoteType = {
  note: NoteByIdQuery["note"]
};

export const createNote = async ({ title, body }: { title: string, body: string }): Promise<ReturnCreateNoteType> => {
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

export const updateNote = async ({ id, title, body }: { id: number, title: string, body: string }): Promise<ReturnUpdateNoteType> => {
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

export const deleteNote = async ({ id }: { id: number }): Promise<ReturnDeleteNoteType> => {
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