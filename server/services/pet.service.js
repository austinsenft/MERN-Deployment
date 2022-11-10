const { Pet } = require("../models/pet.model");

const createPet = async (data) => {
    console.log('service: createPet');
    const pet = await Pet.create(data);
    return pet;
}

const getAllPets = async () => {
    console.log('service: getAllPets');
    const pets = await Pet.find().sort({type:1});
    // blackbelt feature 
    return pets;
}

const getPetById = async (id) => {
    console.log('service: getPetById');
    const pet = await Pet.findById(id);
    return pet;
}

const deletePetById = async (id) => {
    console.log('service: deletePetById');
    const pet = await Pet.findByIdAndDelete(id);
    return pet;
}

const getPetByIdAndUpdate = async (id, data) => {
    console.log('service: getPetByIdAndUpdate');
    const pet = await Pet.findByIdAndUpdate(id, data, {
        // Re-run validations.
        runValidators: true,
        // Return the updated pet.
        new: true
    });
    return pet;
}

const createManyPets = async (documents) => {
    // Don't await inside a loop, it will delay iteration.
    const createPromises = documents.map((document) =>
        createPet(document)
    );
    // The one resulting promise will be awaited by the caller of this function.
    return Promise.allSettled(createPromises);
};

module.exports = {
    createPet: createPet,
    getAllPets,
    getPetById,
    deletePetById,
    getPetByIdAndUpdate,
    createManyPets
};