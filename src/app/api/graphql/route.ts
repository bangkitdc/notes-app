import prisma from '@/lib/prisma';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    body: String!

    createdAt: String
    updatedAt: String
  }

  type Query {
    notes: [Note!]
    note(id: Int!): Note
  }

  type Mutation {
    createNote(title: String!, body: String!): Note!
    updateNote(id: Int!, title: String, body: String): Note!
    deleteNote(id: Int!): Note!
  }
`;

const resolvers = {
  Mutation: {
    createNote: async (_: never, args: { title: string, body: string }) => {
      const newNote = prisma.note.create({
        data: {
          title: args.title,
          body: args.body
        },
      });

      return newNote;
    },
    updateNote: async (_: never, args: { id: number, title: string, body: string }) => {
      const updatedNote = await prisma.note.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          body: args.body
        },
      });

      return updatedNote;
    },
    deleteNote: async (_: never, args: { id: number }) => {
      const deletedNote = await prisma.note.delete({
        where: {
          id: args.id
        }
      });

      return deletedNote;
    }
  },
  Query: {
    notes: async () => prisma.note.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    }),
    note: async (_: never, args: { id: number }) => prisma.note.findFirst({
      where: {
        id: args.id
      }
    })
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };