import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [number, setNumber] = useState('');
    const [numberError, setNumberError] = useState('');
    const [comingday, setComingday] = useState('');
    const [member, setMember] = useState('');
    const [memberError, setMemberError] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [guidNumber, setGuidNumber] = useState('');
    const [guidNumberError, setGuidNumberError] = useState('');
    const [place, setPlace] = useState('');
    const [days, setDays] = useState('');
    const [daysError, setDaysError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to validate name input (only letters, no special characters or numbers)
    const validateName = (name) => {
        const namePattern = /^[A-Za-z]+$/;
        return namePattern.test(name);
    };

    // Function to validate email format
    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Function to validate phone number (10 digits)
    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    // Function to validate numbers (positive integers)
    const validateNumber = (value) => {
        return !isNaN(value) && parseInt(value) > 0;
    };

    // Function to validate date (allow only current date and future dates)
    const validateDate = (date) => {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        return selectedDate >= currentDate;
    };

    const handleSaveBook = () => {
        // Validate name
        if (!validateName(name)) {
            setNameError('Name must contain only letters');
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(number)) {
            setNumberError('Please enter a valid phone number');
            return;
        }

        // Validate members
        if (!validateNumber(member)) {
            setMemberError('Please enter a valid number of members');
            return;
        }

        // Validate guide number
        if (!validateNumber(guidNumber)) {
            setGuidNumberError('Please enter a valid guide number');
            return;
        }

        // Validate days
        if (!validateNumber(days)) {
            setDaysError('Please enter a valid number of days');
            return;
        }

        // Validate date
        if (!validateDate(comingday)) {
            setDaysError('Please select a valid date');
            return;
        }

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
            .post('http://localhost:5555/books', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Create Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-row justify-center">
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 bg-blue-200">
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter name"
                        />
                        {nameError && (
                            <p className="text-red-500 text-sm mt-2">{nameError}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter Email"
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-2">{emailError}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Phone Number</label>
                        <input 
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter phone number"
                        />
                        {numberError && (
                            <p className="text-red-500 text-sm mt-2">{numberError}</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Day of Arrival</label>
                        <input 
                            type="date"
                            value={comingday}
                            min={new Date().toISOString().split('T')[0]} // Set min attribute to current date
                            onChange={(e) => setComingday(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter days"
                        />
                        {!validateDate(comingday) && (
                            <p className="text-red-500 text-sm mt-2">Please select a valid date</p>
                        )}
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Members</label>
                        <input 
                            type="number"
                            value={member}
                            onChange={(e) => setMember(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter members"
                        />
                        {memberError && (
                            <p className="text-red-500 text-sm mt-2">{memberError}</p>
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
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Guide Number</label>
                        <input 
                            type="number"
                            value={guidNumber}
                            onChange={(e) => setGuidNumber(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter guide number"
                        />
                        {guidNumberError && (
                            <p className="text-red-500 text-sm mt-2">{guidNumberError}</p>
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
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Days</label>
                        <input 
                            type="number"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                            placeholder="Enter days"
                        />
                        {daysError && (
                            <p className="text-red-500 text-sm mt-2">{daysError}</p>
                        )}
                    </div>
                    <button className="p-2 bg-sky-700 m-8" onClick={handleSaveBook}>
                        Submit
                    </button>
                </div>
                <div className="ml-4">
                    <img src="https://source.unsplash.com/1100x800/?tourism" alt="Tourism" className="w-[600px] h-auto rounded-md" />

                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <img src="https://source.unsplash.com/900x800/?tourism" alt="Tourism" className="w-[600px] h-auto rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default CreateBooks;
