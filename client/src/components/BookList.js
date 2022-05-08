import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { GET_BOOK } from "../queries";

const Book = () => {
  const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.books);

  return (
    <div>
      <ul>
        {data.books.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
