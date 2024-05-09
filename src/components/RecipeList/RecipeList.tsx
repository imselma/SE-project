import { useEffect, useState } from 'react'
import RecipeCard from '../RecipeCard'
import SearchBar from '../SearchBar'
import CreateRecipeModal from '../CreateRecipeModal'
import useRecipes from '../../customHooks/useRecipes'
import { Recipe } from '../../utils/types'



const RecipeList = () => {

    const [openModal, setOpenModal] = useState(false);
    const userToken = localStorage.getItem('userToken')
    const { data: recipes } = useRecipes()
    const [searchResult, setSearchResult] = useState<Recipe[]>([]);

    useEffect(() => {
        setSearchResult(recipes);
    }, [recipes]);

    const handleChange = (value: string) => {
        const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase()))
        console.log(filteredRecipes);
        setSearchResult(filteredRecipes)
    }
    
    return (
        <>
            <div className='search-and-button' style={{ display: 'flex' }}>
                <SearchBar onSearch={handleChange} />
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
            </div>
            <div className='row' style={{ marginTop: '30px', marginLeft: '15px', alignItems: 'center' }}>
                {searchResult && searchResult.map((recipe, i) => (
                    <RecipeCard recipe={recipe} key={i} />
                ))}
            </div>
            {openModal && <CreateRecipeModal closeModal={setOpenModal} />}
        </>
    )
}

export default RecipeList;