import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPets, deletePet } from "../services/internalApiService"

export const AllPets = (props) => {
    const [pets, setPets] = useState([])

    useEffect(()=>{
        getAllPets()
            .then((data) => {
                setPets(data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }, []) 

    const handleDeleteClick = (idToDelete) => {
        deletePet(idToDelete)
        .then((data) => {
            console.log(data)
            const filteredPets = pets.filter((pet) => {
                return pet._id !== idToDelete
            })
            setPets(filteredPets)
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    return (
        <div className="w-50 mx-auto text-center">
            <h2> Pets</h2>
            {pets.map((pet, i) => {
                const {_id, name, type, description} = pet;
                return (
                    <div key={i} className="shadow mb-4 rounded border p-4">
                        <Link to={`/pets/${_id}`}>
                            <h4>{name}</h4>
                        </Link>
                        <p>{type}</p>
                        <p>{description}</p>

                        <Link to={`/pets/${_id}/edit`}> Edit </Link>
                        //
                        <Link to={`/pets/${_id}`}> Details </Link>
                    </div>
                )
            })}
        </div>
    )
}