package ba.edu.ibu.CookingApp.core.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
@Document("Recipe")//Annotation for connection to the mongoDb and will be stored in recipe collection, -> janije objaniti Document annotation?
public class Recipe {

    private int id;
    private String name;
    private String type; //desert,main meal...
    private String description;
    // private String steps; //Cooking process step by step (can it be string?)
    private String ingredients;
    private Double cookingTime;
    private String restriction;

    public Recipe(int id, String name, String type, String description, String ingredients, Double cookingTime, String restriction) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.ingredients = ingredients;
        this.cookingTime = cookingTime;
        this.restriction = restriction;
    }

    public int getId() { return id;}
    public void setId(int id) { this.id = id;}

    public String getName() { return name;}
    public void setName(String name) { this.name = name;}

    public String getType() { return type;}
    public void setType(String Type) { this.type = type; }

    public  String getDescription() { return description;}
    public void setDescription(String description) { this.description = description;}

   // public String getSteps() { return steps;}
   // public void setSteps(String steps) { this.steps = steps;}

    public String getIngredients() { return ingredients;}
    public void setIngredients(String ingredients) { this.ingredients = ingredients;}

    public Double getCookingTime() { return cookingTime;}
    public void setCookingTime(Double cookingTime) { this.cookingTime = cookingTime;}

    public String getRestriction() { return restriction;}
    public void setRestriction(String restriction) { this.restriction = restriction;}
}

