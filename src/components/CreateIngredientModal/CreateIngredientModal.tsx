/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import useCreateIngredient from '../../customHooks/useCreateIngredient';

const CreateIngredientModal = ({recipeData, newIngredients, closeSubmodal, closeModal}) => {

    const createIngredient = useCreateIngredient();

    const [ingredientData, setIngredientData] = useState({
        name: "",
        category: " ",
        measurementUnit: " "
    })

    const sendRequest = () => {
        for(const newIngredient of newIngredients) {
            
                   createIngredient.mutate({...ingredientData, name: newIngredient}, {
                    onSuccess: () => {
                      console.log('Ingredient added successfully!');
                    },
                    onError: (error) => {
                      console.error('Error adding ingredient:', error);
                    },
                    onSettled: () => {
                    },
                  });
        }
    }
    
  return (
    <>
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
                top: "-40px",
                right: "30%",
                zIndex: 10
            }}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '50px', marginTop: '20px', fontWeight: 'bold'}}>Add Ingredient: </h1>
                </div>
                <div className="modal-body" style={{ marginLeft: '50px', marginTop: '40px' }}>
                    <form style={{width: '500px', marginTop: '-10px', marginRight: '50px'}}>
                        {
                            newIngredients.map((item, index) => {
                                return(
                                    <>
                                        <div key={index} className="mb-3">
                                            <label className="form-label">Name:</label>
                                            <input onChange={(e) => setIngredientData({ ...ingredientData, name: e.target.value })} value={item} type="text" className="form-control" id="exampleInputName2" aria-describedby="emailHelp" />
                                        </div>
                                        <div key={index + 1} className="mb-3">
                                            <label className="form-label">Category:</label>
                                            <input onChange={(e) => setIngredientData({ ...ingredientData, category: e.target.value })} type='text' className="form-control" id="exampleInputDescription2" aria-describedby="emailHelp" />
                                        </div>
                                        <div key={index + 2} className="mb-3">
                                            <label className="form-label">Measurement unit:</label>
                                            <input onChange={(e) => setIngredientData({ ...ingredientData, measurementUnit: e.target.value })} type='text' className="form-control" id="exampleInputUnit2" aria-describedby="emailHelp" />
                                        </div>
                                    </>
                                )
                            })
                        }
                    </form>
                </div>
                <div className="modal-footer" style={{ marginRight: '45px', marginBottom: '25px' }}>
                    <button type="button" className="btn"
                        onClick={() => {
                            sendRequest()
                            closeSubmodal(false)
                            closeModal(false)
                        }}
                        style={{
                            backgroundColor: '#976B7A',
                            color: 'white',
                            width: '120px',
                            height: '45px',
                            fontSize: '20px',
                            marginRight: '10px'
                        }}> Create </button>
                    <button type="button" className="btn"
                        onClick={() => closeSubmodal(false)}
                        style={{
                            backgroundColor: 'white',
                            border: '2px solid #976B7A',
                            color: '#976B7A',
                            width: '120px',
                            height: '45px',
                            fontSize: '20px'
                        }}> Cancle </button>
                </div>
            </div>
        </div>
        <div className="back" 
            style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: 0.5, zIndex:5, top: 0}}></div>
        </>
  )
}

export default CreateIngredientModal