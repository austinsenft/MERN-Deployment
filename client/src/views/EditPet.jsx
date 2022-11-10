import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updatePet, getPetById } from '../services/internalApiService';

export const EditPet = (props) => {
    const { id } = useParams();

    const [formData, setFormData] = useState({})

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        getPetById(id)
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key] === false) {
                delete formData[key];
            }
        }
        updatePet(id, formData)
            .then((data) => {
                console.log('new pet data:', data)
                navigate(`/pets/${data._id}`)
            })
            .catch((error) => {
                console.log(error.response);
                setErrors(error.response?.data?.errors)
            })
    }

    const handleFormChanges = (e) => {
        console.log("here in the change", e.target.checked)
        if (e.target.type === "checkbox") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked,
            })
            return null;
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (formData === null) {
        return null
    }

    const { name, type, description, skill1, skill2, skill3 } = formData;
    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3 className="text-center"> Edit {name}</h3>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div className="form-group">
                    <label className="h6">Pet Name</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                    />
                    {
                        errors?.name && (
                            <span className="text-danger">{errors.name?.message}</span>
                        )
                    }
                </div>
                <div className="form-group">
                    <label className="h6">Pet Type</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="type"
                        value={formData.type}
                        className="form-control"
                    />
                    {
                        errors?.type && (
                            <span className="text-danger">{errors.type?.message}</span>
                        )
                    }
                </div>
                <div className="form-group">
                    <label className="h6">Pet Description</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="description"
                        value={formData.description}
                        className="form-control"
                    />
                </div>
                {
                    errors?.description && (
                        <span className="text-danger">{errors.description?.message}</span>
                    )
                }

                <div className="form-group">
                    <label className="h6">Skill 1</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="skill1"
                        value={formData.skill1}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="h6">Skill 2</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="skill2"
                        value={formData.skill2}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="h6">Skill 3</label>
                    <input
                        onChange={handleFormChanges}
                        type="text"
                        name="skill3"
                        value={formData.skill3}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-sm btn-outline-success">Edit Pet</button>
            </form>
        </div>
    )
}