package ba.edu.ibu.CookingApp.core.service;

import ba.edu.ibu.CookingApp.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.CookingApp.core.model.Recipe;
import ba.edu.ibu.CookingApp.core.model.User;
import ba.edu.ibu.CookingApp.core.model.Advice;
import ba.edu.ibu.CookingApp.core.repository.AdviceRepository;
import ba.edu.ibu.CookingApp.core.repository.UserRepository;
import ba.edu.ibu.CookingApp.rest.dto.AdviceDTO;
import ba.edu.ibu.CookingApp.rest.dto.AdviceRequestDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static java.util.stream.Collectors.toList;

@Service
public class AdviceService {

    private final AdviceRepository adviceRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public AdviceService(UserRepository userRepository, UserService userService, AdviceRepository adviceRepository) {
        this.userRepository = userRepository;
        this.userService= userService;
        this.adviceRepository = adviceRepository;
    }

    //Add new advices
    public AdviceDTO addAdvice (AdviceRequestDTO adviceData){

        String userId = adviceData.getUserId();
        User user = userService.getUserByIdNoDTO(userId);

        Advice newAdvice = adviceData.toEntity();
        newAdvice.setUser(user);
        adviceRepository.save(newAdvice);
        return new AdviceDTO(newAdvice);
    }

    //Get all recipes
    public List<Advice> getAdvices() {
        List<Advice> recipes = adviceRepository.findAll();
        return recipes;
    }

    //Get recipes by id
    public AdviceDTO getAdviceById (String id){
        Optional<Advice> advice = adviceRepository.findById(id);
        if (advice.isEmpty()) {
            throw new ResourceNotFoundException("The recipe does not exist.");
        }
        return new AdviceDTO(advice.get());
    }

    //Updat recipe
    public AdviceDTO updateAdvice (String id, AdviceRequestDTO adviceData){

        Optional<Advice> advice = adviceRepository.findById(id); //Finding advice by ID
        if (advice.isEmpty()) {
            throw new ResourceNotFoundException("The recipe does not exist.");
        }

        String userId = adviceData.getUserId();
        User user = userService.getUserByIdNoDTO(userId);

        Advice updatedAdvice = adviceData.toEntity(); //Creating a new instance of advice and assigning the data
        updatedAdvice.setId(advice.get().getId()); //Set the ID, in order just to update the instance, and not to make a new one
        updatedAdvice.setUser(user);
        updatedAdvice = adviceRepository.save(updatedAdvice); //updating the model
        return new AdviceDTO(updatedAdvice);
    }

    //Delete the recipe
    public void deleteAdvice (String id){  //Why are we here using "void" and in the controllers "Void"?
        Optional<Advice> advice = adviceRepository.findById(id);
        if (advice.isEmpty()) {
            throw new ResourceNotFoundException("The recipe does not exist.");
        }

        advice.ifPresent(adviceRepository::delete);
    }

    // Get by Id but not as DTO
    public Advice getAdviceByIdNoDTO (String id){
        Optional<Advice> advice = adviceRepository.findById(id);
        if (advice.isEmpty()) {
            throw new ResourceNotFoundException("The advice does not exist.");
        }
        System.out.println(advice.get());

        return advice.get();
    }
}
