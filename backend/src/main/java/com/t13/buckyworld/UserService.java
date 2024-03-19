package com.t13.buckyworld;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    //Automatically instantiates userRepository and connects it with the database using @Autowired
    @Autowired
    private UserRepository userRepository;
    public UserService() {

    }

    /**
     * Finds the user in the database based on their id, else returns null.
     * @param id the userID to look for in the database
     * @return Returns an Optional<User> which is a User object if the uID is found, and null if not found.
     */
    public Optional<User> getuserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Queries the database for the 10 users with the most points
     * @return A list of the top 10 users with the most points in descending order.
     */
    public List<User> getTop10UsersByPoints() {
        return userRepository.findTop10ByOrderByPointsDesc();
    }

    /**
     * Saves a user to the database
     * @param uID
     * @param username
     * @return 2 if the user ID exists in the database, 1 if the username string is null or empty, and 0 if success
     */
    public int saveUser(long uID, String username) {
        if (userRepository.existsById(uID)) {
            return 2;
        }
        if (username == null || username.isEmpty()) {
            return 1;
        }

        User newUser = new User(uID, username);
        userRepository.save(newUser);
        return 0;
    }

    public Optional<User> login(String username, String password) {
        List<User> users = userRepository.findByUsername(username);
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getPassword().equals(password)) {
                return Optional.of(users.get(i));
            }
        }
        return Optional.empty();
    }
}