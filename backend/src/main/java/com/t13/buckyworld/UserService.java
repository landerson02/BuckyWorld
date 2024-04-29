package com.t13.buckyworld;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Service class that takes requests found by UserController and processes them
 * Queries UserRepository when needed
 * Acts as an intermediary between UserController and UserRepository
 */
@Service
public class UserService {
    // Automatically instantiates userRepository and connects it with the database
    // using @Autowired
    @Autowired
    private UserRepository userRepository;

    public UserService() {

    }

    /**
     * Finds the user in the database based on their id, else returns null.
     *
     * @param id the userID to look for in the database
     * @return Returns a user object if the uID is found, Optional.null if not
     *         found.
     */
    public Optional<User> getuserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Queries the database for the 10 users with the most points
     *
     * @return A list of the top 10 users with the most points in descending order.
     */
    public List<User> getTop10UsersByPoints() {
        return userRepository.findTop10ByOrderByPointsDesc();
    }

    /**
     * Saves a user to the database
     *
     * @param username The user's username
     * @param password The user's password
     * @return Http status codes depending on if the user is found, returns ok (code 200) if found
     */
    public ResponseEntity<User> saveUser(String username, String password) {
        if (username == null || username.isEmpty()) { // Username was empty
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Code 400
        }
        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Code 409
        }
        User newUser = new User(username, password);
        userRepository.save(newUser);
        return ResponseEntity.ok().build(); // Code 200
    }

    /**
     * Finds a user in the database to give to current user session
     *
     * @param username the user's username
     * @param password the user's password
     * @return Http status codes depending on if the user is found, body of response
     *         is null if any error occurred, returns ok (code 200) and user object if found
     */
    public ResponseEntity<User> login(String username, String password) {
        if (username == null || username.isEmpty()) { // Username was empty
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Code 400
        }
        Optional<User> user = userRepository.findByUsername(username);
        if (user == null) {
            // Username not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Code 404
        } else {
            User validUser = user.get();
            if (validUser.getPassword().equals(password)) {
                // Login successful
                return ResponseEntity.ok(validUser); // Code 200 and user in body
            } else {
                // Incorrect password
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Code 401
            }
        }
    }

    /**
     * Adds points to the specified user
     *
     * @param points   The number of points to be added to the user's current total
     * @param username The username of the user to update
     * @return Http code 404 if not found, else returns code 200 with user in body
     */
    public ResponseEntity<User> updatePoints(int points, String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user == null) {
            // Username not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Code 404
        } else {
            User validUser = (User) user.get();
            // Assumes that location checking was done in frontend before calling this
            validUser.setPoints(validUser.getPoints() + points);
            userRepository.save(validUser);
            return ResponseEntity.ok(validUser);
        }
    }

    /**
     * gets the position of the user in the leaderboard by points
     *
     * @param username username of the user
     * @return position of the user
     */
    public int getLeaderboardPosition(String username) {
        System.out.println("USERNAME: " + username);
        if(username == null || username.isEmpty()) {
            return -1;
        }
        List<User> users = userRepository.findAllByOrderByPointsDesc();
        for(int i = 0; i < users.size(); i++) {
            if(users.get(i).getUsername().equals(username)) {
                return i + 1;
            }
        }
        return -1;
    }

    /**
     * changes the username if newUsername is not taken
     * 
     * @param oldUsername
     * @param newUsername
     * 
     * @return appropriate https code
     */
    public ResponseEntity<User> changeUsername(String oldUsername, String newUsername){

        // new username already taken
        if (userRepository.existsByUsername(newUsername)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Code 400
        }else{
            // change username officially
            userRepository.updateUsername(oldUsername, newUsername);
            return ResponseEntity.ok().build(); // 200
        }
    }
}
