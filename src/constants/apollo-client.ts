import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import { router } from '@/components/router/Router';

const EXECUTED_ROUTES = ["/login", "/signup"];

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions && 
    error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    if (!EXECUTED_ROUTES.includes(window.location.pathname)) {
      router.navigate("/login");
      client.resetStore();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: "include" });

export const client = new ApolloClient({
  link: logoutLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
// import { API_URL } from "./urls";
// import { router } from "@/components/router/Router";

// const EXECUTED_ROUTES = ["/login", "/signup"];

// const logoutLink = onError((error) => {
//   if (
//     error.graphQLErrors?.length &&
//     (error.graphQLErrors[0].extensions && 
//     error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
//   ) {
//     if (!EXECUTED_ROUTES.includes(window.location.pathname)) {
//       router.navigate("/login");
//       client.resetStore();
//     }
//   }
// });

// const httpLink = new HttpLink({
//   uri: `${API_URL}/graphql`,
//   credentials: "include", // Ensure this is set properly
// });

// const link = ApolloLink.from([logoutLink, httpLink]); // Chain multiple links

// export const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });