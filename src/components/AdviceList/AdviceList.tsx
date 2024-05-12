/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import RecipeCard from '../RecipeCard'
import CreateRecipeModal from '../CreateRecipeModal'
import useRecipePaginated from '../../customHooks/useRecipePaginated'
//import useFilterByTraits from '../../customHooks/useFilterByTrait'
import axios from 'axios'
import AdviceCard from "../AdviceCard";
import CreateAdviceModal from "../CreateAdviceModal";



const RecipeList = () => {

    const [openModal, setOpenModal] = useState(false);
    const userToken = localStorage.getItem('userToken')
    const [totalPages, setTotalPages] = useState(1);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    //const { data: filteredAdvices, refetch } = useRecipePaginated({ name: name, restriction: restriction, page: currentPage - 1, size: size }); TODO: Uupdate with real data
    const filteredAdvices={content:[
        {id:"1", name:"Advice 1", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
        //{id:"2", name:"Advice 2", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
        //{id:"3", name:"Advice 3", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
        //{id:"4", name:"Advice 4", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
        ], totalPages:1}

    const handlePageSizeChange = (value) => {
        setSize(parseInt(value));
    }

    useEffect(() => {
        // refetch(); // Refetch data when size changes
    }, [size, name, currentPage]);



    useEffect(() => {
        setTotalPages(filteredAdvices?.totalPages)
    }, [filteredAdvices])

    useEffect(() => {
        setCurrentPage(1);
        // refetch();
    }, [size, totalPages])


    const handlePrevPage = () => {

        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }


    return (
        <>
            <div className='search-and-button' style={{ display: 'flex' }}>

                <div className='input-wrapper' style={{
                    backgroundColor: 'white',
                    width: '20%',
                    borderRadius: '10px',
                    height: '40px',
                    padding: '0 15px',
                    boxShadow: '0px 0px 8px #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '30px',
                    marginLeft: '40px'
                }}>
                    <img className='SearchIcon' src='src/assets/img/search.svg' alt="Search Icon" style={{ marginRight: '5px' }} />
                    <input
                        placeholder='Type to search...'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            height: '100%',
                            fontSize: '14px',
                            width: '100%',
                            marginLeft: 'auto'
                        }}
                    />
                </div>
                {/*userToken &&*/ ( //TODO: Uncomment when connected to backend
                    <button
                        type="button"
                        className="btn"
                        style={{
                            backgroundColor: '#976B7A',
                            color: 'white',
                            width: '180px',
                            height: '50px',
                            fontSize: '20px',
                            marginTop: '15px',
                            marginLeft: 'auto',
                            marginRight: '60px'
                        }}
                        onClick={() => setOpenModal(true)}
                    >
                        Create Advice +
                    </button>
                )}
            </div >
            <div className='row' style={{ marginTop: '30px', marginLeft: '15px', alignItems: 'center' }}>
                {filteredAdvices && filteredAdvices?.content?.map((adv, i) => (
                    <AdviceCard advice={adv} key={i} />
                ))}

            </div>
            <div className="pagination" style={{ marginTop: '15px' }}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}
                        style={{
                            backgroundColor: '#976B7A',
                            color: 'white',
                            width: '80px',
                            height: '35px',
                            fontSize: '17px',
                            marginTop: '15px',
                            marginLeft: '45px',
                            marginRight: '60px',
                            borderRadius: '10px',
                        }}>Previous</button>
                <span style={{
                    fontSize: '20px',
                    marginTop: '15px',
                }}>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}
                        style={{
                            backgroundColor: '#976B7A',
                            color: 'white',
                            width: '80px',
                            height: '35px',
                            fontSize: '17px',
                            marginTop: '15px',
                            marginLeft: '45px',
                            marginRight: '60px',
                            borderRadius: '10px',
                        }}>Next</button>
            </div>
            {openModal && <CreateAdviceModal closeModal={setOpenModal} />}
        </>
    )
}

export default RecipeList;