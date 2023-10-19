package ba.edu.ibu.CookingApp.core.repository;

import ba.edu.ibu.CookingApp.core.model.User;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class UserRepository {

    private List<User> users;

    public UserRepository(){
        this.users = Arrays.asList(
                new User(1,"selmaimirovic28@gmail.com", "123456", "imselma", "Selma", "Imširović"),
                new User(2,"aminameric11@gmail.com", "21032002", "meric_a", "Amina", "Merić"),
                new User(3,"melisag23@gmail.com", "melisa23", "melisageca", "Melisa", "Geca"),
                new User(4,"isabel8@gmail.com", "28032002", "bella", "Isabel", "Duerod")
        );
    }
    public List<User> findAll(){ return users;}
    public User findById(int id) {return users.stream().filter(user -> user.getId() == id).findFirst().orElse(null);}
}
