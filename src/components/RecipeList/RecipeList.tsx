/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import RecipeCard from '../RecipeCard'
import CreateRecipeModal from '../CreateRecipeModal'
import useRecipePaginated from '../../customHooks/useRecipePaginated'
//import useFilterByTraits from '../../customHooks/useFilterByTrait'
import axios from 'axios'



const RecipeList = () => {

    const [openModal, setOpenModal] = useState(false);
    const userToken = localStorage.getItem('userToken')
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [restriction, setRestriction] = useState("");
    const { data: filteredRecipes, refetch } = useRecipePaginated({ name: name, restriction: restriction, page: currentPage - 1, size: size });
    //const { data: filteredRecipesByTrait } = useFilterByTraits({ restriction: restriction });
    const [recipeRestrictions, setRecipeRestrictions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2804/api/recipes/restrictionVlues").then(
            (res) => {
                setRecipeRestrictions(res.data);
            })
    }, [])

    useEffect(() => {
        recipeRestrictions?.map((restriction, i) => (
            setRestriction(restriction)
        ))
    }, [recipeRestrictions])


    const handlePageSizeChange = (value) => {
        setSize(parseInt(value));
    }

    useEffect(() => {
        refetch(); // Refetch data when size changes
    }, [size, name, currentPage]);


    /*useEffect(() => {
        console.log(filteredRecipes)

    }, [filteredRecipes, filteredRecipesByTrait])*/

    useEffect(() => {
        setTotalPages(filteredRecipes?.totalPages)
    }, [filteredRecipes])

    useEffect(() => {
        setCurrentPage(1);
        refetch();
    }, [size, totalPages])

    const handleFilterByRestriction = (value) => {
        setRestriction(value);
    }

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
                <div>
                    <select onChange={(e) => handlePageSizeChange(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{
                            backgroundColor: 'white',
                            width: '70%',
                            borderRadius: '10px',
                            height: '40px',
                            boxShadow: '0px 0px 8px #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                            marginLeft: '40px'
                        }} >

                        {[...Array(12).keys()].map((number) => {
                            return <option className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                key={number + 1} value={number + 1}>Display {number + 1}</option>
                        })}
                    </select>
                </div>
                <div>
                    <select onChange={(e) => handleFilterByRestriction(e.target.value)} className="form-select" style={{
                            backgroundColor: 'white',
                            width: '70%',
                            borderRadius: '10px',
                            height: '40px',
                            boxShadow: '0px 0px 8px #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '30px',
                            marginLeft: '40px'
                        }} aria-label="Default select example">
                        <option >Select a Trait</option>
                        {recipeRestrictions?.map((restriction, i) => (
                            <option>{restriction}</option>     
                        ))}
                    </select>
                </div>
                {userToken && (
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
                        Create Recipe +
                    </button>
                )}
            </div >
            <div className='row' style={{ marginTop: '30px', marginLeft: '15px', alignItems: 'center' }}>
               {filteredRecipes && filteredRecipes?.content?.map((recipe, i) => (
                    <RecipeCard recipe={recipe} key={i} />
               ))}
               {/* {filteredRecipesByTrait && filteredRecipesByTrait?.map((recipe, i) => (
                    <RecipeCard recipe={recipe} key={i} />
                ))}*/}

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
            {openModal && <CreateRecipeModal closeModal={setOpenModal} />}
        </>
    )
}

export default RecipeList;