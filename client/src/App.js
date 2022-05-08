import "./App.css";
import Book from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import AddBook from "./components/AddBook";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Book />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
