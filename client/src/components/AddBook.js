import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_BOOK, GET_AUTHOR, GET_BOOKS } from "../queries";

const AddBook = () => {
  const [bookInfo, setBookInfo] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK);
  // if (loading) return 'Submitting...';
  // if (error) return 'Submission error!';

  const ShowAuthors = () => {
    const { loading, error, data } = useQuery(GET_AUTHOR);

    if (loading) return <option disabled>Loading authors</option>;

    if (error) return <p>Error :(</p>;

    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const SubmitForm = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name: bookInfo.name,
        genre: bookInfo.genre,
        authorId: bookInfo.authorId,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form id="add-book" onSubmit={SubmitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setBookInfo({ ...bookInfo, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setBookInfo({ ...bookInfo, genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) =>
            setBookInfo({ ...bookInfo, authorId: e.target.value })
          }
        >
          <option>Select author</option>
          {ShowAuthors()}
        </select>
      </div>
      <button>ADD</button>
    </form>
  );
};
export default AddBook;
