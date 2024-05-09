import { useNavigate } from "react-router-dom";
import { Recipe } from "../../utils/types"


type Props = {
    recipe: Recipe
}

const RecipeCard = ({recipe}: Props) => {
    const navigate = useNavigate();

    const navigateToRecipePage = () => {
        navigate(`/singlerecipe/${recipe.id}`);
        localStorage.setItem('recipeID', String(recipe.id))
    }


    return (
        <div className="col-12 col-md-3 m-3">
           <div className="card">
               <div className="card-header" style={{fontWeight:'bolder', color: 'gray'}}>Trait: {recipe.restriction}</div>
               <div className="card-body">
                   <h5 className="card-title">{recipe.name}</h5>
                   {recipe.user && ( // Check if recipe.user is defined
                        <h6 className="card-subtitle">
                            Creator: {recipe.user.name + ' ' + recipe.user.surname}
                        </h6>
                    )}
                  
                   <a className="btn" style={{backgroundColor: '#976B7A', color: 'white', marginTop: '20px'}} onClick={navigateToRecipePage}>View</a>
               </div>
            </div>
        </div>

    )
};

export default RecipeCard