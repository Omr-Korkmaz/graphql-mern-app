import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { GET_BOOK } from "../queries";

const BookDetail = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("DATASAA", data);

  return <div id="book-details"></div>;
};

// export default graphql(getBookQuery, {
//     options: (props) => {
//         return {
//             variables: {
//                 id: props.bookId
//             }
//         }
//     }
// })(BookDetails);

export default BookDetail;
