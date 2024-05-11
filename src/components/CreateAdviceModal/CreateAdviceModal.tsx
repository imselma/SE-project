import { useState } from "react";

const CreateAdviceModal = ({ closeModal }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreate = () => {
        if (name.trim() === "" || description.trim() === "") {
            alert("Please enter both name and description.");
            return;
        }
        console.log({ name, description });
        closeModal();
    };

    return (
        <>
            <div className="modalBackground">
                <div className="modal-content" style={{
                    width: '600px',
                    height: '400px',
                    border: '2px solid gray',
                    borderRadius: '20px',
                    margin: 'auto',
                    marginTop: '100px',
                    backgroundColor: '#fff',
                    padding: "20px",
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    position: "absolute",
                    top: "10%",
                    right: "25%",
                    zIndex: 1
                }}>
                    <div className="modal-header">
                        <h1 className="modal-title">Create Advice</h1>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description:</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{marginRight: '45px'}}>
                        <button type="button" className="btn"
                                onClick={() => {
                                    handleCreate()
                                }}
                                style={{
                                    backgroundColor: '#976B7A',
                                    color: 'white',
                                    width: '120px',
                                    height: '45px',
                                    fontSize: '20px',
                                    marginRight: '10px'
                                }}> Create
                        </button>
                        <button type="button" className="btn"
                                style={{
                                    backgroundColor: 'white',
                                    border: '2px solid #976B7A',
                                    color: '#976B7A',
                                    width: '120px',
                                    height: '45px',
                                    fontSize: '20px'
                                }} onClick={() => closeModal(false)}> Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className="back"
                 style={{
                     position: "absolute",
                     width: "100%",
                     height: "100%",
                     backgroundColor: "white",
                     opacity: 0.5,
                     zIndex: 0,
                     top: 0
                 }}>
            </div>
        </>
    );
};

export default CreateAdviceModal;
