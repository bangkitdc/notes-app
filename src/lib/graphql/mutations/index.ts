import { gql } from "@apollo/client";

export const createNoteMutation = gql(`
  mutation CreateNote($title: String!, $body: String!) {
    createNote(title: $title, body: $body) {
      id
      body
      title
      createdAt  
    }
  }
`);

export const updateNoteMutation = gql(`
  mutation UpdateNote($id: Int!, $title: String, $body: String) {
    updateNote(id: $id, title: $title, body: $body) {
      id
      body
      title
      createdAt
    }
  }
`);

export const deleteNoteMutation = gql(`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`);