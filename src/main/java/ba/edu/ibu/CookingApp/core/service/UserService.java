package ba.edu.ibu.CookingApp.core.service;

import ba.edu.ibu.CookingApp.core.api.mailsender.MailSender;
import ba.edu.ibu.CookingApp.core.model.User;
import ba.edu.ibu.CookingApp.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private MailSender mailgunSender;
    @Autowired
    private MailSender sendgridSender;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

   /* public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(@PathVariable int id) {
        return userRepository.findById(id);
    }*/

    public String sendEmailToAllUsers(String message) {
        List <User> users = userRepository.findAll();
        return mailgunSender.send(users,message);

        //return mailgunSender.send(users,message);
    }
}
