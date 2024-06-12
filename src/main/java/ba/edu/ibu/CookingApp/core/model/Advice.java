package ba.edu.ibu.CookingApp.core.model;

import ba.edu.ibu.CookingApp.core.model.enums.RecipeRestriction;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Advice {
    @Id
    private String id;
    private String name;
    private String description;
    private User user;

    public String getId() { return id;}
    public void setId(String id) { this.id = id;}

    public String getName() { return name;}
    public void setName(String name) { this.name = name;}

    public  String getDescription() { return description;}
    public void setDescription(String description) { this.description = description;}

    public User getUser() { return user;}
    public void setUser (User user) { this.user = user;}
}
