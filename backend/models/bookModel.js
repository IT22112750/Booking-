import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        comingday: {
            type: String,
            required: true,
        },
        member: {
            type: Number,
            required: true,
        },
        vehicleName: {
            type: String,
            required: true,
        },
        guidNumber: {
            type: Number,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        days: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Cat', bookSchema);