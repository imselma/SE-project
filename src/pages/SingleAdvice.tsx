/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
        <>
            <div className='adviceBody' style={{ display: 'flex', justifyContent: 'center' }}>
                {adviceData && (
                    <div style={{ margin: '20px', backgroundColor: '#F5F5F6', borderRadius: '8px', width: '80%', maxWidth: '1200px' }}>
                        <div className='header' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className='title' style={{ marginTop: '20px', marginLeft: '70px' }}>
                                <h1>{adviceData.name}</h1>
                                <div className="card" style={{ width: '100%', marginTop: '20px', backgroundColor: '#976B7A', padding: '10px', borderRadius: '8px' }}>
                                    <div className='third' style={{ display: 'flex', color: 'white' }}>
                                        <p style={{ marginLeft: '20px' }}>CREATOR:</p>
                                        <div style={{ display: 'flex', marginLeft: '10px' }}>
                                            <h6>{adviceData.user.name}</h6>
                                            <h6 style={{ marginLeft: '10px' }}>{adviceData.user.surname}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='rightSide' style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                                <div className="card" style={{ width: '100%', marginTop: '20px', backgroundColor: '#976B7A', borderRadius: '8px', padding: '10px' }}>
                                    <p style={{ color: 'white', textAlign: 'justify', margin: '0px' }}>{adviceData.description}</p>
                                </div>
                                {userID === adviceData.user.id && (
                                    <div className='buttons' style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                        <button
                                            type="button"
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
                                            }}
                                            onMouseEnter={() => setDeleteHovered(true)}
                                            onMouseLeave={() => setDeleteHovered(false)}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            style={{
                                                backgroundColor: editHovered ? '#7B556A' : '#976B7A',
                                                color: 'white',
                                                width: '125px',
                                                height: '45px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={() => setEditHovered(true)}
                                            onMouseLeave={() => setEditHovered(false)}
                                            onClick={() => setOpenModal(true)}
                                        >
                                            Edit advice
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {openModal && <EditAdviceModal closeModal={setOpenModal} />}
        </>
    );
};

export default SingleAdvice;
