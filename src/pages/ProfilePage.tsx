/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import useRecipes from '../customHooks/useRecipes'
import useUserById from '../customHooks/useUserById'
import RecipeCard from '../components/RecipeCard'


const ProfilePage = () => {

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    username: "",
    userType: "MEMBER",
  })

  //const [userData, setUserData] = useState<User>([])
  const [id, setId] = useState(localStorage.getItem('userID'))


  const { data: recipes } = useRecipes();
  const getUserById = useUserById();
  const userRecipes = [];

  recipes && recipes.map((recipe) => {  //moram stavljati && jer checkiram da li vrijednost uopste postoji i nije null ili undefined
    if (recipe.user && recipe.user.id === id) {
      userRecipes.push(recipe);
    }
  })
  console.log(userRecipes)

  useEffect(() => {
    if (id) {
      getUserById.mutate(id, {
        onSuccess: (data) => {
          console.log(data);
          const { name, surname, email, password, username } = data;  //extracting onyl data which I need
          setUserData({
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
        }
      })
    }
  }, [id])


  return (
    <>
      <div className='profilePage' style={{ marginLeft: '35px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '40px', padding: '20px', backgroundColor: '#F5F5F6', borderRadius: '8px', width: '650px', height: '300px' }}>
          <div style={{ display: 'flex', marginLeft: '20px' }}>
            <h2>{userData.name}</h2>
            <h2 style={{ marginLeft: '10px' }}>{userData.surname}</h2>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <h5>{userData.userType}</h5>
          </div>
          <div style={{ margin: '40px', padding: '20px', backgroundColor: '#976B7A', borderRadius: '8px', width: '500px', height: '110px', marginLeft: '20px', marginTop: '15px' }}>
            <div style={{ display: 'flex' }}>
              <h5 style={{ color: 'white' }}>Username:</h5>
              <p style={{ marginLeft: '10px', color: 'white' }}>{userData.username}</p>
            </div>
            <div style={{ display: 'flex' }}>
              <h5 style={{ color: 'white' }}>Email:</h5>
              <p style={{ marginLeft: '10px', color: 'white' }}>{userData.email}</p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: '40px', width: '100%' }}>
          <h2>{userData.name}'s recipes</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px', marginLeft: '20px' }}>
          {userRecipes.length > 0 ? (
            userRecipes.map((recipe, i) => (
              <RecipeCard recipe={recipe} key={i} />
            ))
          ) : (
            <h4 style={{ marginLeft: '20px', marginTop: '30px', color: '#976B7A' }}>You have't created recipes yet!</h4>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage