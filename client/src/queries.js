import { useQuery, gql, useMutation } from "@apollo/client";

const GET_AUTHOR = gql`
  query GetAuthor {
    authors {
      name
      id
    }
  }
`;

const GET_BOOK = gql`
  query GetBook {
    books {
      id
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

export { GET_AUTHOR, GET_BOOK, ADD_BOOK };
