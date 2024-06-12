package ba.edu.ibu.CookingApp.rest.dto;

import ba.edu.ibu.CookingApp.core.model.Advice;
import ba.edu.ibu.CookingApp.core.model.Recipe;
import ba.edu.ibu.CookingApp.core.model.enums.RecipeRestriction;

import java.util.List;
public class AdviceRequestDTO {

    private String name;
    private String description;
    private String userId;
    public AdviceRequestDTO(){}
    public AdviceRequestDTO(Advice advice, String user){

        this.name = advice.getName();
        this.description = advice.getDescription();
        this.userId= user;
    }
    public Advice toEntity() {

        Advice advice = new Advice();
        advice.setName(name);
        advice.setDescription(description);
        this.setUserId(userId);
        return advice;
    }


    public String getName() { return name;}
    public void setName(String name) { this.name = name;}

    public  String getDescription() { return description;}
    public void setDescription(String description) { this.description = description;}

    public String getUserId() { return userId;}
    public void setUserId(String userId) { this.userId = userId;}
}
