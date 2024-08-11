import { gql } from "@apollo/client";

export const getNotesQuery = gql`
  query Notes {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

export const getNoteByIdQuery = gql`
  query NoteById($id: Int!) {
    note(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;