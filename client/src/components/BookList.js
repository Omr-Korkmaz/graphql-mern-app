import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { GET_BOOKS } from "../queries";
import BookDetail from "./BookDetail";
import { useState } from "react";

const Book = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  console.log(selectedBook);

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data.books.map(({ name, id }) => (
          <li onClick={(e) => setSelectedBook(id)} key={id}>
            {name}
          </li>
        ))}
      </ul>
      <BookDetail bookId={selectedBook} />
    </div>
  );
};

export default Book;
