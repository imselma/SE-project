import RecipeList from '../components/RecipeList/RecipeList'

const RecipesPage = () => {

  return (
    <>
      <div className='header' style={{ flexDirection: 'row'}}>
        <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Discover tasty recipes...</h3>
        <RecipeList />
      </div>
    </>
  )
}

export default RecipesPage