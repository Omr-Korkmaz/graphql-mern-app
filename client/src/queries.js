import { useQuery, gql, useMutation } from "@apollo/client";

const GET_AUTHOR = gql`
  query GetAuthor {
    authors {
      name
      id
    }
  }
`;

const GET_BOOKS = gql`
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

// String is not work???
const GET_BOOK = gql`
  query GetBook($bookId: ID) {
    book(Id: $bookId) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { GET_AUTHOR, GET_BOOKS, ADD_BOOK, GET_BOOK };
