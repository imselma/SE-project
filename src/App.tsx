import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import NavigationBar from "./components/NavBar/NavigationBar";
import SingleRecipe from "./pages/SingleRecipe";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";


function App() {


  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/singlerecipe/:id" element={<SingleRecipe />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </>
  )
}

export default App;
