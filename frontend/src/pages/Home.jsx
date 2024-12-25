import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { generatePDF } from "../../utils/GeneratePDF";
import { useBookStore } from "../store/useBookStore";
// import Home from './pages/Home';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  //
  const { setSelectedBook } = useBookStore((state) => ({
    setSelectedBook: state.setSelectedBook,
  }));
  //
  useEffect(() => {
    setLoding(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoding(false);
      })
      .catch((error) => {
        console.log(error);
        setLoding(false);
      });
  }, []);
  //
  const columns = [
    "name",
    "email",
    "number",
    "comingday",
    "member",
    "vehicleName",
    "guidNumber",
    "place",
    "days",
  ];
  const data = books.map((book) => {
    return {
      name: book.name,
      email: book.email,
      number: book.number,
      comingday: book.comingday,
      member: book.member,
      vehicleName: book.vehicleName,
      guidNumber: book.guidNumber,
      place: book.place,
      days: book.days,
    };
  });
  //
  const fileName = "book-list";
  //
  const handleExport = () => {
    const bookCount = books.length;
    const additionalInfo = `Total Books: ${bookCount}`;
    //
    generatePDF(additionalInfo, columns, data, fileName);
  };
  //
  // Function to update search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    Object.values(book).some((value) =>
      value.toString().toLowerCase().includes(searchTerm)
    )
  );
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3x1 my-8">Book List</h1>
        <div className="flex justify-center gap-x-4 items-center">
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4x1" />
          </Link>
          <button
            onClick={handleExport}
            className="bg-sky-600 text-white px-4 py-2 rounded-md"
          >
            Download Report
          </button>
        </div>
      </div>
      {/* search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-slate-600 rounded-md p-2 w-full my-4"
        onChange={handleSearchChange} // Attach the onChange handler
      />
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Name
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Email
              </th>
              <th className="border border-slate-600 rounded-mdmax-md:hidden">
                Number
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
              Day of Arrval
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Members
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                VehicleName
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                GuidNumber
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Places
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Days
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.name}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.email}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.number}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.comingday}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.member}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.vehicleName}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.guidNumber}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.place}
                </td>
                <td className="border border-slate-600 rounded-md text-center max-md:hidden">
                  {book.days}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link
                      to={`/books/details/${book._id}`}
                      onClick={() => setSelectedBook(book)}
                    >
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link
                      to={`/books/edit/${book._id}`}
                      onClick={() => setSelectedBook(book)}
                    >
                      <AiOutlineEdit className="text-2x1 text-yellow-800" />
                    </Link>
                    <Link
                      to={`/books/delete/${book._id}`}
                      onClick={() => setSelectedBook(book)}
                    >
                      <MdOutlineDelete className="text-2x1 text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
