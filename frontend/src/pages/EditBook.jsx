import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";

const EditBook = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [comingday, setComingday] = useState("");
  const [member, setMember] = useState("");
  const [memberError, setMemberError] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [guidNumber, setGuidNumber] = useState("");
  const [guidNumberError, setGuidNumberError] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [daysError, setDaysError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { selectedBook } = useBookStore((state) => ({
    selectedBook: state.selectedBook,
  }));

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${selectedBook._id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setNumber(response.data.number);
        setComingday(response.data.comingday);
        setMember(response.data.member);
        setVehicleName(response.data.vehicleName);
        setGuidNumber(response.data.guidNumber);
        setPlace(response.data.place);
        setDays(response.data.days);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.error(error);
      });
  }, [selectedBook._id]);

  const handleEditBook = () => {
    let valid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("Please enter a name.");
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError("Name can only contain letters.");
      valid = false;
    } else {
      setNameError("");
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate number
    if (!number || !/^\d+$/.test(number)) {
      setNumberError("Please enter a valid phone number.");
      valid = false;
    } else {
      setNumberError("");
    }

    // Validate member
    if (!member || !/^\d+$/.test(member)) {
      setMemberError("Please enter a valid number of members.");
      valid = false;
    } else {
      setMemberError("");
    }

    // Validate guidNumber
    if (!guidNumber || !/^\d+$/.test(guidNumber)) {
      setGuidNumberError("Please enter a valid guide number.");
      valid = false;
    } else {
      setGuidNumberError("");
    }

    // Validate days
    if (!days || !/^\d+$/.test(days)) {
      setDaysError("Please enter a valid number of days.");
      valid = false;
    } else {
      setDaysError("");
    }

    if (!valid) return;

    const data = {
      name,
      email,
      number,
      comingday,
      member,
      vehicleName,
      guidNumber,
      place,
      days,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${selectedBook._id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check the console.");
        console.error(error);
      });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${
              nameError ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter name"
            required
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`border-2 px-4 py-2 w-full ${
              emailError ? "border-red-500" : "border-gray-500"
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Phone Number</label>
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${
              numberError ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter phone number"
            required
          />
          {numberError && (
            <p className="text-red-500 text-sm mt-1">{numberError}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Day of Arrival</label>
          <input
            type="date"
            value={comingday}
            onChange={(e) => setComingday(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Enter days"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Members</label>
          <input
            type="number"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${
              memberError ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter members"
            required
          />
          {memberError && (
            <p className="text-red-500 text-sm mt-1">{memberError}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Vehicle Name</label>
          <input
            type="text"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Enter vehicle name"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Guide Number</label>
          <input
            type="number"
            value={guidNumber}
            onChange={(e) => setGuidNumber(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${
              guidNumberError ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter guide number"
            required
          />
          {guidNumberError && (
            <p className="text-red-500 text-sm mt-1">{guidNumberError}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Places</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            placeholder="Enter places name"
            required
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Days</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${
              daysError ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter days"
            required
          />
          {daysError && (
            <p className="text-red-500 text-sm mt-1">{daysError}</p>
          )}
        </div>
        <button
          className="p-2 bg-sky-300 m-8"
          onClick={handleEditBook}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
