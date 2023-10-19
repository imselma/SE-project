package ba.edu.ibu.CookingApp.rest.controllers;

import ba.edu.ibu.CookingApp.core.model.Recipe;
import ba.edu.ibu.CookingApp.core.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController (RecipeService recipeService){
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> findAll(){ return recipeService.findAll();}

    @GetMapping("/{id}")
    public Recipe findById(@PathVariable int id){ return recipeService.findById(id);}


}
