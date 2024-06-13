import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteAdvice from '../customHooks/useDeleteAdvice';
import { Advice } from '../utils/types';
import useAdviceById from '../customHooks/useAdviceById';
import EditAdviceModal from '../components/EditAdviceModal';

const SingleAdvice = () => {
    const [adviceData, setAdviceData] = useState<Advice | null>(null);
    const [id, setId] = useState(localStorage.getItem('adviceID'));
    const navigate = useNavigate();
    const userID = localStorage.getItem('userID');
    const [openModal, setOpenModal] = useState(false);
    const [editHovered, setEditHovered] = useState(false);
    const [deleteHovered, setDeleteHovered] = useState(false);

    const deleteAdvice = useDeleteAdvice();
    const getAdviceById = useAdviceById();

    useEffect(() => {
        if (id) {
            getAdviceById.mutate(id, {
                onSuccess: (data) => {
                    console.log("Advice data:", data);
                    setAdviceData(data);
                },
                onError: (error) => {
                    console.error("Error getting advice:", error);
                },
            });
        }
    }, [id]);

    const handleDelete = () => {
        if (id) {
            deleteAdvice.mutate(id, {
                onSuccess: () => {
                    console.log("Advice deleted successfully!");
                    navigate("/advices"); // Navigate to another page on success
                },
                onError: (error) => {
                    console.error("Error deleting advice:", error);
                },
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {adviceData && (
                <div style={{ width: '80%', maxWidth: '1200px', backgroundColor: '#F5F5F6', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ textAlign: 'center' }}>{adviceData.name}</h1>
                    <div style={{ backgroundColor: '#976B7A', padding: '10px', borderRadius: '8px', marginTop: '20px' }}>
                        <p style={{ color: 'white', textAlign: 'center', margin: '0px' }}>
                            CREATED BY: {adviceData.user.name} {adviceData.user.surname}
                        </p>
                    </div>
                    <div style={{ marginTop: '20px', backgroundColor: '#976B7A', padding: '15px', borderRadius: '8px' }}>
                        <p style={{ color: 'white', textAlign: 'center', margin: '0px' }}>
                            {adviceData.description}
                        </p>
                    </div>
                    {userID === adviceData.user.id && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: deleteHovered ? '#f2f2f2' : 'white',
                                    border: '2px solid #976B7A',
                                    color: '#976B7A',
                                    width: '125px',
                                    height: '45px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                }}
                                onMouseEnter={() => setDeleteHovered(true)}
                                onMouseLeave={() => setDeleteHovered(false)}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: editHovered ? '#7B556A' : '#976B7A',
                                    color: 'white',
                                    width: '125px',
                                    height: '45px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                                onMouseEnter={() => setEditHovered(true)}
                                onMouseLeave={() => setEditHovered(false)}
                                onClick={() => setOpenModal(true)}
                            >
                                Edit Advice
                            </button>
                        </div>
                    )}
                </div>
            )}
            {openModal && <EditAdviceModal closeModal={setOpenModal} />}
        </div>
    );
};

export default SingleAdvice;
