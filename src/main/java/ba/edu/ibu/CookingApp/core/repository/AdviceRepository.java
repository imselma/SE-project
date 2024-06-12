package ba.edu.ibu.CookingApp.core.repository;

import ba.edu.ibu.CookingApp.core.model.Advice;
import ba.edu.ibu.CookingApp.core.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdviceRepository extends MongoRepository<Advice, String> {
    Optional<Recipe> findByName(String name);

}
