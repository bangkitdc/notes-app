/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateNote($title: String!, $body: String!) {\n    createNote(title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt  \n    }\n  }\n": types.CreateNoteDocument,
    "\n  mutation UpdateNote($id: Int!, $title: String, $body: String) {\n    updateNote(id: $id, title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt\n    }\n  }\n": types.UpdateNoteDocument,
    "\n  mutation DeleteNote($id: Int!) {\n    deleteNote(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n": types.DeleteNoteDocument,
    "\n  query Notes {\n    notes {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n": types.NotesDocument,
    "\n  query NoteById($id: Int!) {\n    note(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n": types.NoteByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNote($title: String!, $body: String!) {\n    createNote(title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt  \n    }\n  }\n"): (typeof documents)["\n  mutation CreateNote($title: String!, $body: String!) {\n    createNote(title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt  \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateNote($id: Int!, $title: String, $body: String) {\n    updateNote(id: $id, title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateNote($id: Int!, $title: String, $body: String) {\n    updateNote(id: $id, title: $title, body: $body) {\n      id\n      body\n      title\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteNote($id: Int!) {\n    deleteNote(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteNote($id: Int!) {\n    deleteNote(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Notes {\n    notes {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Notes {\n    notes {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query NoteById($id: Int!) {\n    note(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query NoteById($id: Int!) {\n    note(id: $id) {\n      id\n      title\n      body\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;