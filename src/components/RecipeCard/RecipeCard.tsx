import { useNavigate } from "react-router-dom";
import { Recipe } from "../../utils/types"
import { useState } from "react";


type Props = {
    recipe: Recipe
}

const RecipeCard = ({recipe}: Props) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const navigateToRecipePage = () => {
        navigate(`/singlerecipe/${recipe.id}`);
        localStorage.setItem('recipeID', String(recipe.id))
        console.log("recipeId", recipe.id);
    }


    return (
        <div className="col-12 col-md-3 m-3">
           <div className="card">
               <div className="card-header" style={{fontWeight:'bolder', color: 'gray'}}>Trait: {recipe.restriction}</div>
               <div className="card-body">
                   <h5 className="card-title">{recipe.name}</h5>
                   {recipe.user && ( 
                        <h6 className="card-subtitle">
                            Creator: {recipe.user.name + ' ' + recipe.user.surname}
                        </h6>
                    )}
                  
                   <a className="btn" style={{backgroundColor: isHovered ? '#7B556A' : '#976B7A', color: 'white', marginTop: '20px'}} 
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   onClick={navigateToRecipePage}>View</a>
               </div>
            </div>
        </div>

    )
};

export default RecipeCard