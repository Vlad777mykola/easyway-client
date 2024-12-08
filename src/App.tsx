import { ApolloProvider } from "@apollo/client";
import "./App.css";
import { client } from "./constants/apollo-client";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/router/Router";
import Guard from "./components/auth/Guard";

function App() {
  return (
    <ApolloProvider client={client}>
      <Guard>
        <RouterProvider router={router} />
      </Guard>
    </ApolloProvider>
  );
}

export default App;
