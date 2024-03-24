package com.t13.buckyworld;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
     * @param username the User's username
     * @return 2 if the username exists in the database, 1 if the username string is null or empty, and 0 if success
     */
    public ResponseEntity<User> saveUser(String username, String password) {
        if (userRepository.existsByUsername(username))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        if (username == null || username.isEmpty()) { //Username was empty
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        User newUser = new User(username, password);
        userRepository.save(newUser);
        return 0;
    }

    public ResponseEntity<User> login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            // Username not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            if (user.getPassword().equals(password)) {
                // Login successful
                return ResponseEntity.ok(user);
            } else {
                // Incorrect password
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }
    }
}