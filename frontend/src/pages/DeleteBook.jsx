import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";

const DeleteBook = () => {
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  // const {id} = useParams();
  const { selectedBook } = useBookStore((state) => ({
    selectedBook: state.selectedBook,
  }));
  //
  const handleDeleteBook = () => {
    setLoding(true);
    axios
      .delete(`http://localhost:5555/books/${selectedBook._id}`)
      .then(() => {
        setLoding(false);
        navigate("/");
      })
      .catch((error) => {
        setLoding(false);
        alert("An error happend. Please check console");
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
        <h3 className="text-2x1">Are you sure want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
