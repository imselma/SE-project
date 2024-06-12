package ba.edu.ibu.CookingApp.rest.dto;

import ba.edu.ibu.CookingApp.core.model.Advice;

import java.util.List;
public class AdviceDTO {

    //private String id;
    private String name;
    private String description;
    private String username;
    private String surname;

    public AdviceDTO(Advice advice){

        this.name = advice.getName();
        this.description = advice.getDescription();
        this.username = advice.getUser().getName();
        this.surname = advice.getUser().getSurname();
    }

    public String getName() { return name;}
    public void setName(String name) { this.name = name;}

    public String getDescription() { return description;}
    public void setDescription(String description) { this.description = description;}

    public String getUserName() { return username;}
    public void setUserName(String userName) { this.username = username;}

    public String getSurname() { return surname;}
    public void setSurname(String surname) { this.surname = surname;}
}
