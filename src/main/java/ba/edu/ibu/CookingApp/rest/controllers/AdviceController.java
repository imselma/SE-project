package ba.edu.ibu.CookingApp.rest.controllers;

import ba.edu.ibu.CookingApp.core.model.Advice;
import ba.edu.ibu.CookingApp.core.model.Recipe;
import ba.edu.ibu.CookingApp.core.service.AdviceService;
import ba.edu.ibu.CookingApp.core.service.RecipeService;
import ba.edu.ibu.CookingApp.rest.dto.AdviceDTO;
import ba.edu.ibu.CookingApp.rest.dto.AdviceRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/advices")
@SecurityRequirement(name = "JWT Security")
public class AdviceController {

    private final AdviceService adviceService;

    public AdviceController (AdviceService adviceService){
        this.adviceService = adviceService;
    }

    //Endpoint for getting all advcies
    @RequestMapping(method = RequestMethod.GET, path = "/")
    public ResponseEntity<List<Advice>> getAdvices(){
        return ResponseEntity.ok(adviceService.getAdvices());
    }

    //Endpoint for adding new advice
    @RequestMapping(method = RequestMethod.POST, path = "/addAdvice")
    // @PreAuthorize("hasAnyAuthority('MEMBER')")
    public ResponseEntity<AdviceDTO> addAdvice (@RequestBody AdviceRequestDTO advice){
        return ResponseEntity.ok(adviceService.addAdvice(advice));
    }

    //Endpoint for getting advice by ID
    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    // @PreAuthorize("hasAnyAuthority('MEMBER')")
    public ResponseEntity<AdviceDTO> getAdviceById(@PathVariable String id){
        return ResponseEntity.ok(adviceService.getAdviceById(id));
    }

    //Endpoint for updating advices
    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    //@PreAuthorize("hasAnyAuthority('MEMBER')")
    public ResponseEntity<AdviceDTO> updateAdvice (@PathVariable String id, @RequestBody AdviceRequestDTO advice){
        return ResponseEntity.ok(adviceService.updateAdvice(id, advice));
    }

    //Endpoint for deleting advices
    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    //@PreAuthorize("hasAnyAuthority('MEMBER')")
    public ResponseEntity<Void> deleteAdvice(@PathVariable String id){
        adviceService.deleteAdvice(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT); //Marks the operation completed
    }

    //Endpoint for getting a recipe by id but not DTO
    @RequestMapping(method = RequestMethod.GET, path= "notDTO/{id}")
    public ResponseEntity<Advice> getAdviceByIdNoDTO(@PathVariable String id){
        return ResponseEntity.ok(adviceService.getAdviceByIdNoDTO(id));
    }

}
