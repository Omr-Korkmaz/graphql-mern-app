import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const GET_BOOK = gql`
  query GetBook {
    books {
      name
      id
    }
  }
`;

const Book = () => {
  const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.books);
  return data.books.map(({ name, id }) => (
    <div key={name}>
      <p>
        {name}: {id}
      </p>
    </div>
  ));
};

export default Book;
