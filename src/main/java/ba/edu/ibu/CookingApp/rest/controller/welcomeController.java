package ba.edu.ibu.CookingApp.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class welcomeController {

    @GetMapping("/welcome")

    public String sayWelcome(@RequestParam(value = "name", defaultValue = "everybody") String name){

        return "**Welcome " + name + " to my CookBook web application!**";

    }
}