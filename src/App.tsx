/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import NavigationBar from "./components/NavBar/NavigationBar";
import SingleRecipe from "./pages/SingleRecipe";
import LoginPage from "./pages/LoginPage";
import {RegisterPage} from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdvicePage from "./pages/AdvicePage.tsx";
import SingleAdvice from "./pages/SingleAdvice";


function App() {


  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//home" element={<HomePage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//recipes" element={<RecipesPage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//advices" element={<AdvicePage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//aboutus" element={<AboutUsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="https://se-project-frontend-4ymb.onrender.com//profile" element={<ProfilePage />} />
        </Route>
        <Route path="https://se-project-frontend-4ymb.onrender.com//singlerecipe/:id" element={<SingleRecipe />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//login" element={<LoginPage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//register" element={<RegisterPage />} />
        <Route path="https://se-project-frontend-4ymb.onrender.com//singleadvice/:id" element={<SingleAdvice />} />
      </Routes>

    </>
  )
}

export default App;
