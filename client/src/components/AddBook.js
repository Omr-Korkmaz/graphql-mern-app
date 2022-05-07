import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";

const getAuthorsQuery = gql`
  query GetAuthor {
    authors {
      name
      id
    }
  }
`;


const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre:String!, $authorId:String!) {
    addBook(name: $name, genre:$genre, authorId:$authorId ) {
      id
      name
      genre
      authorId
    }
  }
`;




const AddBook = () => {



    const [Name, setName]=useState('');
    const [Genre, setGenre]=useState('');
    const [AuthorId, setAuthorId]=useState('');




  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return <option disabled>Loading authors</option>;

  if (error) return <p>Error :(</p>;

  const HandleSubmit = (event)=>{
      event.preventDefault();
      console.log(Name, Genre, AuthorId)


   
      addBook({ variables: { name: setName, genre:setGenre, AuthorId:setAuthorId } });
      }

  

  return (
    <form id="add-book" onSubmit={HandleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e)=>setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e)=>setAuthorId(e.target.value)}>
          <option>Select author</option>
          {data.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      <button>Add</button>
    </form>
  );
};

export default AddBook;
