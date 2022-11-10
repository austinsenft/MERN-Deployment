const express = require('express');

const {
    handleCreatePet,
    handleGetAllPets,
    handleGetPetById,
    handleDeletePetById,
    handleUpdatePetById,
    handleCreateManyPets
} = require('../controllers/pet.controller')


const router = express.Router();


router.get('/', handleGetAllPets)
router.post('/', handleCreatePet)
router.get('/:id', handleGetPetById)
router.delete('/:id', handleDeletePetById)
router.put('/:id', handleUpdatePetById)
router.post('/many', handleCreateManyPets)


module.exports = { petRouter: router }