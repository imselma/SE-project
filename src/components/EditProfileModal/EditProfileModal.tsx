/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import useEditProfile from '../../customHooks/useEditProfile'
import useUserById from '../../customHooks/useUserById'
import { User } from '../../utils/types'
import bcrypt from "bcryptjs-react";
 
const EditProfileModal = ({ closeModal }) => {
    const [profileData, setProfileData] = useState<User>({
        email: "",
        password: "",
        username: "",
        name: "",
        surname: "",
        userType: "MEMBER"
    })
 
    const [id, setId] = useState(localStorage.getItem('userID'))
    const editProfile = useEditProfile();
    const getUserById = useUserById();
    const [isHovered, setIsHovered] = useState(false);
 
    useEffect(() => {
        if (id) {
            getUserById.mutate(id, {
                onSuccess:  (data) => {
                    console.log(data);
                    const { name, surname, email, password, username } = data;  //extracting onyl data which I need
                    setProfileData({
                        name: name || "",
                        surname: surname || "",
                        email: email || "",
                        password: password || "",
                        username: username || "",
                        userType: "MEMBER",
                    }); 
 
                },
                onError: (error) => {
                    console.error("Error geting user:", error);
                },
            })
        }
 
    }, [id])
 
    const handleEdit = async () => {
 
        if (id) {
 
            const hashedPassword = await bcrypt.hash(profileData.password, 10);
            editProfile.mutate({ id, userData: { ...profileData, password: hashedPassword }},
 
                {
                    onSuccess: () => {
                        console.log('Profile edited successfully!');
                        closeModal(false)
                    },
                    onError: (error) => {
                        console.error('Error editing profile:', error);
                    },
                    onSettled: () => {
                    }
                })
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
                    top: "-60px",
                    right: "30%",
                    zIndex: 1
                }}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ marginLeft: '50px', marginTop: '20px', fontWeight: 'bold' }}>Edit your profile information...</h1>
                    </div>
                    <div className="modal-body" style={{ marginLeft: '50px', marginTop: '40px' }}>
                        <form style={{ width: '500px', marginTop: '-10px', marginRight: '50px' }}>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" value={profileData.name} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Surname:</label>
                                <textarea className="form-control" value={profileData.surname} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setProfileData({ ...profileData, surname: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <textarea className="form-control" value={profileData.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                            </div>
 
                            <div className="mb-3">
                                <label className="form-label">Username:</label>
                                <input type="text" className="form-control" value={profileData.username} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer" style={{ marginRight: '45px', marginBottom: '25px' }}>
                        <button type="button" className="btn"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleEdit}
                            style={{
                                backgroundColor: isHovered ? '#7B556A' : '#976B7A',
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
                style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: 0.5, zIndex: 0, top: 0 }}></div>
        </>
    )
}
export default EditProfileModal