import axios from 'axios';


const http = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const getAllPets = async () => {
    const res = await http.get('/pets');
    return res.data;
}

export const getPetById = async (id) => {
    const res = await http.get(`/pets/${id}`);
    return res.data;
}

export const createPet = async (data) => {
    const res = await http.post('/pets', data);
    return res.data;
}

export const updatePet = async (id, data) => {
    const res = await http.put(`/pets/${id}`, data);
    return res.data;
}

export const deletePet = async (id) => {
    const res = await http.delete(`/pets/${id}`);
    return res.data;
}