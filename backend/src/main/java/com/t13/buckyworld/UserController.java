package com.t13.buckyworld;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;

/**
 * Controller class created to handle requests from the frontend
 * Listens for mapping calls and calls UserService methods
 */
@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Saves a user to the database
     *
     * @param user A JSON object containing a user object with username and password
     * @return Http status codes depending on if the user is found, returns ok (code
     *         200) if found
     */
    @PostMapping("/save-user")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return userService.saveUser(user.getUsername(), user.getPassword());
    }

    /**
     * Finds a user in the database to give to current user session
     *
     * @param loginRequest A JSON object containing username and password fields
     * @return Http status codes depending on if the user is found, body of response
     *         is null if any error occurred, returns ok (code 200) and user object
     *         if found
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    /**
     * Adds points to the specified user
     *
     * @param points The number of points to be added to the user's current total
     * @param user   A JSON object containing the user's username and password
     * @return Http code 404 if not found, else returns code 200 with user in body
     */
    @PostMapping("/update-points")
    public ResponseEntity<User> updatePoints(@RequestParam int points,
            @RequestBody User user) {
        return userService.updatePoints(points, user.getUsername());
    }

    /**
     * Gets the top 10 users by points
     * @return List of Users
     */
    @GetMapping("/top-10-users")
    public List<User> getTop10Users() {
        return userService.getTop10UsersByPoints();
    }

    /**
     * Gets The position of the user on the leaderboard
     *
     * @param username The username of the user
     * @return The ranking of the user by points
     */
    @GetMapping("/get-user-ranking")
    public int getUserRanking(@RequestParam String username) {
        return userService.getLeaderboardPosition(username);
    }


    /**
     * @param oldusername current username
     * @param newusername desired username change
     */
    @PutMapping("change-username")
    public ResponseEntity<User> changeUsername(@RequestParam String oldusername, @RequestParam String newusername){
        return userService.changeUsername(oldusername, newusername);

    }
}
