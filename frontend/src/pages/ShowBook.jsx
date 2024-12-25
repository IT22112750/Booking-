import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useBookStore } from "../store/useBookStore";

const ShowBook = () => {
  const [book, setBooks] = useState({});
  const [loading, setLoding] = useState(false);
  // const {id} = useParams();
  const { selectedBook } = useBookStore((state) => ({
    selectedBook: state.selectedBook,
  }));

  useEffect(() => {
    setLoding(true);
    axios
      .get(`http://localhost:5555/books/${selectedBook._id}`)
      .then((response) => {
        setBooks(response.data);
        setLoding(false);
      })
      .catch((error) => {
        console.log(error);
        setLoding(false);
      });
  }, []);

  

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4">
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Name</span>
            <span>{book.name}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Email</span>
            <span>{book.email}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Phone Number</span>
            <span>{book.number}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Day of Arrval</span>
            <span>{book.comingday}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Members</span>
            <span>{book.member}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">VehicleName</span>
            <span>{book.vehicleName}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">GuidNumber</span>
            <span>{book.guidNumber}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Places</span>
            <span>{book.place}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Days</span>
            <span>{book.days}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-x1 mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;


