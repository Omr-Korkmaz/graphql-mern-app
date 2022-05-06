
import './App.css';
import Book from './components/Book';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const App=()=> {


  const client = new ApolloClient({

    uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>

    <div className="App">
  <Book />
    </div>
    </ApolloProvider>

  );
}

export default App;
