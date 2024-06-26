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
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/advices" element={<AdvicePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/singlerecipe/:id" element={<SingleRecipe />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/singleadvice/:id" element={<SingleAdvice />} />
      </Routes>

    </>
  )
}

export default App;
