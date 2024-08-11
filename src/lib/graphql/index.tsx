// "use client";

// import { HttpLink } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   ApolloClient,
//   InMemoryCache,
// } from "@apollo/experimental-nextjs-app-support";

// export function client() {
//   const httpLink = new HttpLink({
//     uri: "/api/graphql",
//   });
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }

// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={client}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_URL + "/api/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
