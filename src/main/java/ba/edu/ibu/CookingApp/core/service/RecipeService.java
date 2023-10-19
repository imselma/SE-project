package ba.edu.ibu.CookingApp.core.service;

import ba.edu.ibu.CookingApp.core.model.Recipe;
import ba.edu.ibu.CookingApp.core.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;


    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Recipe findById(@PathVariable int id) {
        return recipeRepository.findById(id);
    }
}
