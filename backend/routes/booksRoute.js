import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try{  
        if(
            !request.body.name||
            !request.body.email||
            !request.body.number||
            !request.body.comingday||
            !request.body.member||
            !request.body.vehicleName||
            !request.body.guidNumber||
            !request.body.place||
            !request.body.days
        ){
            return response.status(400).send({
                message: 'Send all required fields: name,email,number,comingday,member,vehicleName,guidNumber,place,days',
            });
        }
        const newBook = {
            name: request.body.name,
            email: request.body.email,
            number: request.body.number,
            comingday: request.body.comingday,
            member: request.body.member,
            vehicleName: request.body.vehicleName,
            guidNumber: request.body.guidNumber,
            place: request.body.place,
            days: request.body.days,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/:id', async (request, response) => {
    try{

        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.name||
            !request.body.email||
            !request.body.number||
            !request.body.comingday||
            !request.body.member||
            !request.body.vehicleName||
            !request.body.guidNumber||
            !request.body.place||
            !request.body.days
        ){
            return response.status(400).send({
                message: 'Send all required fields: name,email,number,comingday,member,vehicleName,guidNumber,place,days',
            });
        }

        const{id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message : 'Book updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})   

router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});   

export default router;