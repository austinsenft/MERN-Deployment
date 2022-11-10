const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, '{PATH} is required.'],
            minlength: [3 , '{PATH} must be at least {MINLENGTH} characters.'], 
            unique: [true, '{PATH} this name is already taken']
            // blackbelt feature 
        },
        type: {
            type: String, 
            required: [true, '{PATH} is required.'],
            minlength: [3 , '{PATH} must be at least {MINLENGTH} characters.']
        },
        description: {
            type: String, 
            required: [true, '{PATH} is required.'],
            minlength: [3 , '{PATH} must be at least {MINLENGTH} characters.']
        },
        skill1: {
            type: String, 
        },
        skill2: {
            type: String, 
        },
        skill3: {
            type: String, 
        },
    },
    {timestamps: true}
);


/* 
Register schema with mongoose and provide a string to name the collection. This
also returns a reference to our model that we can use for DB operations.
*/
const Pet = mongoose.model("Pet", PetSchema);


module.exports = {Pet: Pet};