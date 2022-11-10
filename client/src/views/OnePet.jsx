import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById , deletePet} from '../services/internalApiService';

export const OnePet = (props) => {
    const { id } = useParams();
    const [pet, setPet] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        getPetById(id)
            .then((data) => {
                setPet(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    const handleDeleteClick = () => {
        deletePet(id)
            .then((data) => {
                navigate('/pets')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (pet === null) {
        return null;
    }
    
    const { name, type, description, skill1, skill2, skill3 } = pet
    return (
        <div className="w-100 mx-auto shadow mb-4 rounded border p-4">
            <h1>Details about {name}</h1>
            <p>Pet Type: {type}</p>
            <p>Description: {description}</p>

            <p>Skills: {skill1}</p>
            <p>{skill2}</p>
            <p>{skill3}</p>

            <button
            className="btn btn-sm btn-outline-danger mx-auto"
            onClick={()=> {
                handleDeleteClick()
            }}> Adopt {name} </button>

        </div>
    )
}