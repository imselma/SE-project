/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import useEditRecipe from '../../customHooks/useEditRecipe';
import useRecipeById from '../../customHooks/useRecipeById';
import { Recipe2 } from '../../utils/types';
import axios from 'axios';
import CreateIngredientModal from '../CreateIngredientModal';


const EditRecipeModal = ({ closeModal }) => {

        const [recipeData, setRecipeData] = useState<Recipe2>({
            name: "",
            description: "",
            steps: "",
            ingredients: [],
            cookingTime: 0,
            restriction: "",
            userId: localStorage.getItem('userID') || ""
        });

        const [id, setId] = useState(localStorage.getItem('recipeID'))
        const editRecipe = useEditRecipe();
        const getRecipeById = useRecipeById();
        const [ingredients, setIngredients] = useState([]);
        const [newIngredients, setNewIngredients] = useState([]);
        const [submodal, setSubmodal] = useState(false);

        useEffect(() => {
            axios.get("http://localhost:2804/api/ingredients/").then((res) =>
            {
                console.log(res.data);
                setIngredients(res.data);
            } )
        },[])
    
        const updateNewIngredients = () => {
            const ingredientNames = ingredients.map(ingredient => ingredient.name.toLowerCase());
            console.log("Names: ", ingredientNames);
    
            const newIngredients = recipeData.ingredients
                .map(item => item.trim().toLowerCase())
                .filter(item => !ingredientNames.includes(item));
    
            console.log("All ingredients:", recipeData.ingredients);
            console.log("New ingredients:", newIngredients);
    
            setNewIngredients(newIngredients);
        };
        console.log(newIngredients)

        useEffect(() => {
            if (newIngredients.length > 0) {
                setSubmodal(true)
            }
        }, [newIngredients])
        

        useEffect(() => {
            if (id) {
                console.log(id)
                getRecipeById.mutate(id, {
                    onSuccess: (data) => {
                        console.log(data);
                        const { name, description, steps, ingredients, cookingTime, restriction } = data;  
                        setRecipeData({
                            name: name || "",
                            description: description || "",
                            steps: steps || "",
                            ingredients: ingredients || [],
                            cookingTime: cookingTime || 0,
                            restriction: restriction ||"",
                            userId: localStorage.getItem('userID') || " " 
                        });
                        console.log("korisnikoc id: ", recipeData.userId)

                    },
                    onError: (error) => {
                        console.error("Error geting recipe:", error);
                    },
                })
            }

        }, [id])

        const handleEdit = async () => {
            if (id) {

                console.log("Editing recipe with data:", recipeData);
                editRecipe.mutate({ id, recipeData: recipeData },
                    {
                        onSuccess: () => {
                            console.log('Recipe edited successfully!');
                            closeModal(false)
                        },
                        onError: (error) => {
                            console.error('Error editing recipe:', error);
                        },
                        onSettled: () => {
                        }
                    })
            }
        }

        return (
            <>
            {submodal && <CreateIngredientModal recipeData={recipeData} newIngredients={newIngredients} closeSubmodal={setSubmodal} closeModal={closeModal} />}
            <div className="modalBackground">
                <div className="modal-content" style={{
                      width: '600px',
                      height: '600px',
                      overflowY: "scroll",
                      border: '2px solid gray',
                      borderRadius: '20px',
                      margin: 'auto',
                      marginTop: '100px',
                      backgroundColor: '#fff',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                      position: "absolute",
                      top: "-60px",
                      right: "30%",
                      zIndex: 1
                }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '50px', marginTop: '20px', fontWeight: 'bold' }}>Edit recipe data...</h1>
                    </div>
                    <div className="modal-body" style={{ marginLeft: '50px', marginTop: '40px' }}>
                        <form style={{ width: '500px', marginTop: '-10px', marginRight: '50px' }}>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" value={recipeData.name} className="form-control" id="exampleInputName1" aria-describedby="emailHelp" onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea value={recipeData.description} className="form-control" id="exampleInputDescription1" aria-describedby="emailHelp" onChange={(e) => setRecipeData({ ...recipeData, description: e.target.value })}  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Steps:</label>
                                <textarea value={recipeData.steps} className="form-control" id="exampleInputSteps1" aria-describedby="emailHelp" onChange={(e) => setRecipeData({ ...recipeData, steps: e.target.value })}  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ingredients:</label>
                                <input type="text" value={recipeData.ingredients.join(", ")} className="form-control" id="exampleInputIngredients1" aria-describedby="emailHelp" onChange={(e) => setRecipeData({ ...recipeData, ingredients: (e.target.value).split(", ") })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cooking time:</label>
                                <input type="number" min={0} value={recipeData.cookingTime} className="form-control" id="exampleInputCookingTime1" aria-describedby="emailHelp" onChange={(e) => setRecipeData({ ...recipeData, cookingTime: Number(e.target.value) })} />
                            </div>
                            <label className="form-label">Trait:</label>
                            <select value={recipeData.restriction} onChange={(e) => setRecipeData({ ...recipeData, restriction: e.target.value })} className="form-select" style={{ marginBottom: 16 }} aria-label="Default select example">
                                <option value=" ">Select a Trait</option>
                                <option value="HALAL">Halal</option>
                                <option value="GLUTEN_FREE">Gluten free</option>
                                <option value="VEGETARIAN">Vegetarian</option>
                                <option value="VEGAN">Vegan</option>
                                <option value="LACTOSE_FREE">Lactose free</option>
                            </select>
                        </form>
                    </div>
                    <div className="modal-footer" style={{ marginRight: '45px', marginBottom: '25px' }}>
                        <button type="button" className="btn"
                            onClick={() => { handleEdit()}}
                            style={{
                                backgroundColor: '#976B7A',
                                color: 'white',
                                width: '120px',
                                height: '45px',
                                fontSize: '20px',
                                marginRight: '10px'
                            }}> Save </button>
                        <button type="button" className="btn"
                            style={{
                                backgroundColor: 'white',
                                border: '2px solid #976B7A',
                                color: '#976B7A',
                                width: '120px',
                                height: '45px',
                                fontSize: '20px'
                            }} onClick={() => closeModal(false)}> Cancle </button>
                    </div>
                </div>
            </div>
            <div className="back"
                style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: 0.5, zIndex: 0, top: 0 }}>
            </div>
        </>
    )
    }
    export default EditRecipeModal