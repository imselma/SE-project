/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";
import useCreateAdvice from "../../customHooks/useCreateAdvice";

const CreateAdviceModal = ({ closeModal }) => {
    const [adviceData, setAdviceData] = useState({
        name: "",
        description: "",
        userId: localStorage.getItem('userID')
    });

    const createAdvice = useCreateAdvice();
    const [userId, setUserId] = useState(localStorage.getItem("userID"));
    const [isHovered, setIsHovered] = useState(false);

    const handleCreation = async () => {

            createAdvice.mutate({ ...adviceData, userId: userId }, {
                onSuccess: () => {
                    console.log('Advice added successfully!');
                    
                },
                onError: (error) => {
                    console.error('Error adding advice:', error);
                },
                onSettled: () => {
                },
            });
    };

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
                      top: "-60px",
                      right: "30%",
                      zIndex: 1
                }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '50px', marginTop: '20px', fontWeight: 'bold' }}>Create Recipe</h1>
                    </div>
                    <div className="modal-body" style={{ marginLeft: '50px', marginTop: '40px' }}>
                        <form style={{ width: '500px', marginTop: '-10px', marginRight: '50px' }}>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" onChange={(e) => setAdviceData({ ...adviceData, name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea className="form-control" id="exampleInputDescription1" aria-describedby="emailHelp" onChange={(e) => setAdviceData({ ...adviceData, description: e.target.value })} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{ marginRight: '45px', marginBottom: '25px' }}>
                        <button type="button" className="btn"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => { handleCreation()}}
                            style={{
                                backgroundColor: isHovered ? '#7B556A' : '#976B7A',
                                color: 'white',
                                width: '120px',
                                height: '45px',
                                fontSize: '20px',
                                marginRight: '10px'
                            }}> Create </button>
                        <button type="button" className="btn"
                            style={{
                                backgroundColor:'white',
                                border: '2px solid #976B7A',
                                color: '#976B7A',
                                width: '120px',
                                height: '45px',
                                fontSize: '20px'
                            }} 
                            onClick={() => closeModal(false)}> Cancle </button>
                    </div>
                </div>
            </div>
            <div className="back"
                style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: 0.5, zIndex: 0, top: 0 }}>
            </div>
        </>
    );
};

export default CreateAdviceModal;
