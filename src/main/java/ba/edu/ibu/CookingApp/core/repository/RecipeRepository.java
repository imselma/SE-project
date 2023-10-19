package ba.edu.ibu.CookingApp.core.repository;
import ba.edu.ibu.CookingApp.core.model.Recipe;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class RecipeRepository {

    private List<Recipe> recipes;

    public RecipeRepository(){
        this.recipes = Arrays.asList(
                new Recipe(1,"Tiramisu", "Desert", "Tiramisu is a coffee-flavoured Italian dessert. It is made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar and mascarpone, flavoured with cocoa.", "ladyfingers, egg yolks, sugar, coffee, mascarpone, cocoa powder",2.0, "No restriction!"),
                new Recipe(2,"Baklava", "Desert", "Baklava is a layered pastry dessert made of filo pastry, filled with chopped nuts, and sweetened with syrup or honey. ", "phyllo dough, finely crushed pistachios, butter, and a simple syrup made of sugar, water, and lemon juice", 2.5, "Not allowed to persons alergic to some kind of nuts!")
        );
    }
    public List<Recipe> findAll(){ return recipes;}
    public Recipe findById(int id) {return recipes.stream().filter(recipe-> recipe.getId() == id).findFirst().orElse(null);}
}
