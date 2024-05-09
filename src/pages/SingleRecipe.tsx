/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeleteRecipe from '../customHooks/useDeleteRecipe'
import { Recipe } from '../utils/types'
import useRecipeById from '../customHooks/useRecipeById'
import EditRecipeModal from '../components/EditRecipeModal'

const SingleRecipe = () => {

    const [recipeData, setRecipeData] = useState<Recipe | null>(null)  //ovo je na pocetku undefined ili null, kao sto si npr prije stavljala [], sada s obzirom da koristis odredjen type, moras koristiti null
    const [id, setId] = useState(localStorage.getItem('recipeID'))
    const [steps, setSteps] = useState([])
    const navigate = useNavigate()
    const userID = localStorage.getItem('userID')
    const [openModal, setOpenModal] = useState(false);

    const deleteRecipe = useDeleteRecipe();
    const getRecipeById = useRecipeById();

    useEffect(() => {
        if (id) {
            getRecipeById.mutate(id, {
                onSuccess: (data) => {
                    console.log(data);
                    setRecipeData(data);
                    setSteps(data.steps.split(". "));

                },
                onError: (error) => {
                    console.error("Error geting recipe:", error);
                },
            })
        }

    }, [id])


    const handleDelete = () => {
        if (id) {

            deleteRecipe.mutate(id, {
                onSuccess: () => {
                    console.log("Recipe deleted successfully!");
                    navigate("/recipes"); // Navigate to another page on success
                },
                onError: (error) => {
                    console.error("Error deleting recipe:", error);
                },
            })
        }

    }

    console.log(steps)


    return (
        <>
            <div className='recipeBody'>
                {recipeData && (
                    <>
                     <div style={{ margin: '20px', backgroundColor: '#F5F5F6', borderRadius: '8px', width: '1490px', height: '550px', display: 'flex'  }}>
                            <div className='header' style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='title' style={{ marginTop: '20px', marginLeft: '70px' }}>
                                    <h1>{recipeData.name}</h1>
                                    <div className="card" style={{ width: '470px', marginTop: '50px' }}>
                                        <div className="list-group list-group-flush" style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#976B7A', padding: '2px', height: '60px' }}>
                                            <div className='first'>
                                                <p style={{ marginRight: '5px', marginLeft: '20px', color: 'white' }}>COOKING TIME:</p>
                                                <h6 style={{ marginRight: '5px', marginLeft: '55px', color: 'white', marginTop: '-10px' }}>{recipeData.cookingTime} min</h6>
                                            </div>
                                            <div className='second'>
                                                <p style={{ marginRight: '10px', marginLeft: '50px', color: 'white' }}>TRAIT:</p>
                                                <h6 style={{ marginRight: '20px', marginLeft: '47px', marginTop: '-10px', color: 'white' }}>{recipeData.restriction}</h6>
                                            </div>
                                            <div className='third'>
                                                <p style={{ marginLeft: '50px', color: 'white' }}>CREATOR:</p>
                                                <div style={{ display: 'flex' }}>
                                                    <h6 style={{ marginLeft: '25px', color: 'white', marginTop: '-10px' }}>{recipeData.user.name} </h6>
                                                    <h6 style={{ marginLeft: '10px', color: 'white', marginTop: '-10px' }}>{recipeData.user.surname} </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='rightSide' style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <div className="card" style={{ width: '425px', height: '150px', border: 'none', marginLeft: '60px', marginTop: '30px', display: 'flex', flexDirection: 'column' }}>

                                        <div className="card-body" style={{ backgroundColor: '#976B7A', borderRadius: '10px' }}>
                                            <p className="card-text" style={{ color: 'white', textAlign: 'justify', padding: '10px' }}>{recipeData.description}</p>
                                        </div>
                                    </div>
                                    {userID === recipeData.user.id ? (
                                        <div className='buttons' style={{ display: 'flex', gap: '15px', marginTop: '70px', marginBottom: '20px', marginLeft: '60px' }}>
                                            <button type="button" className="btn" style={{ backgroundColor: 'white', border: '2px solid #976B7A', color: '#976B7A', width: '125px', height: '45px', fontSize: '18px', fontWeight: 'bold' }} onClick={handleDelete}>Delete</button>
                                            <button type="button" className="btn" style={{ backgroundColor: '#976B7A', color: 'white', width: '125px', height: '45px', fontSize: '18px', marginLeft: '20px', marginTop:'0px', fontWeight: 'bold' }} onClick={() => setOpenModal(true)}>Edit recipe</button>
                                        </div>
                                    ) : null}

                                </div>

                            </div>
                                <div className='ingredientsAndSteps' style={{ marginTop: '170px', display: 'flex', marginLeft: '90px' }}>
                                    <div className='Ingredients' style={{ marginLeft: '100px', marginTop: '-40px' }}>
                                        <h4 style={{ fontWeight: 'bold' }}>Ingredients:</h4>
                                        {Array.isArray(recipeData.ingredients) && recipeData.ingredients.map((ingredient, i) => (
                                            <ul key={i}>
                                                <li style={{ color: '#976B7A', cursor: 'pointer' }}>
                                                    <span style={{ color: 'black' }} >{ingredient}</span>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                    <div className='cookingSteps' style={{ marginLeft: '100px', marginTop: '-40px' }}>
                                        <h4 style={{ fontWeight: 'bold' }}>Cooking steps:</h4>
                                        {steps.map((step, i) => (
                                            <ol type='1' style={{ position: 'relative' }} key={i} start={i + 1}>
                                                <li style={{ marginTop: '10px' }}>
                                                    <span style={{ marginLeft: '10px' }}>{step}</span>
                                                </li>
                                            </ol>
                                        ))}
                                    </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {openModal && <EditRecipeModal closeModal={setOpenModal} />}
        </>
    )
}

export default SingleRecipe