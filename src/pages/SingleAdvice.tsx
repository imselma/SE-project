/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDeleteAdvice from '../customHooks/useDeleteAdvice'
import { Advice } from '../utils/types'
import useAdviceById from '../customHooks/useAdviceById'
import EditAdviceModal from '../components/EditAdviceModal'

const SingleAdvice = () => {

    const [adviceData, setAdviceData] = useState<Advice | null>(null)  //ovo je na pocetku undefined ili null, kao sto si npr prije stavljala [], sada s obzirom da koristis odredjen type, moras koristiti null
    const [id, setId] = useState(localStorage.getItem('adviceID'))
    const navigate = useNavigate()
    const userID = localStorage.getItem('userID')
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
                    console.error("Error geting advices:", error);
                },
            })
        }

    }, [id])


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
            })
        }

    }
    return (
        <>
            <div className='adviceBody'>
                {adviceData && (
                    <>
                     <div style={{ margin: '20px', backgroundColor: '#F5F5F6', borderRadius: '8px', width: '1490px', height: '550px', display: 'flex'  }}>
                            <div className='header' style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className='title' style={{ marginTop: '20px', marginLeft: '70px' }}>
                                    <h1>{adviceData.name}</h1>
                                    <div className="card" style={{ width: '470px', marginTop: '50px' }}>
                                        <div className="list-group list-group-flush" style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#976B7A', padding: '2px', height: '60px' }}>
                                            <div className='third'>
                                                <p style={{ marginLeft: '50px', color: 'white' }}>CREATOR:</p>
                                                <div style={{ display: 'flex' }}>
                                                    <h6 style={{ marginLeft: '25px', color: 'white', marginTop: '-10px' }}>{adviceData.user.name} </h6>
                                                    <h6 style={{ marginLeft: '10px', color: 'white', marginTop: '-10px' }}>{adviceData.user.surname} </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='rightSide' style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <div className="card" style={{ width: '425px', height: '150px', border: 'none', marginLeft: '60px', marginTop: '30px', display: 'flex', flexDirection: 'column' }}>

                                        <div className="card-body" style={{ backgroundColor: '#976B7A', borderRadius: '10px' }}>
                                            <p className="card-text" style={{ color: 'white', textAlign: 'justify', padding: '10px' }}>{adviceData.description}</p>
                                        </div>
                                    </div>
                                    {userID === adviceData.user.id ? (
                                        <div className='buttons' style={{ display: 'flex', gap: '15px', marginTop: '70px', marginBottom: '20px', marginLeft: '60px' }}>
                                            <button type="button" className="btn" style={{ backgroundColor: deleteHovered ? '#f2f2f2' : 'white', border: '2px solid #976B7A', color: '#976B7A', width: '125px', height: '45px', fontSize: '18px', fontWeight: 'bold' }}
                                            onMouseEnter={() => setDeleteHovered(true)}
                                            onMouseLeave={() => setDeleteHovered(false)} 
                                            onClick={handleDelete}>Delete</button>
                                            <button type="button" className="btn" style={{ backgroundColor: editHovered ? '#7B556A' : '#976B7A', color: 'white', width: '125px', height: '45px', fontSize: '18px', marginLeft: '20px', marginTop:'0px', fontWeight: 'bold' }}
                                            onMouseEnter={() => setEditHovered(true)}
                                            onMouseLeave={() => setEditHovered(false)} 
                                            onClick={() => setOpenModal(true)}>Edit advice</button>
                                        </div>
                                    ) : null}

                                </div>

                            </div>
                        </div>
                    </>
                )}
            </div>
            {openModal && <EditAdviceModal closeModal={setOpenModal} />}
        </>
    )
}

export default SingleAdvice