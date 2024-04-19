package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Saves a user to the database
     *
     * @param loginRequest A JSON object containing username and password fields
     * @return Http status codes depending on if the user is found, returns ok (code
     *         200) if found
     */
    @PostMapping("/save-user")
    public ResponseEntity<User> saveUser(@RequestBody LoginRequest loginRequest) {
        return userService.saveUser(loginRequest.getUsername(), loginRequest.getPassword());
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
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest.getUsername(), loginRequest.getPassword());
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
            @RequestBody LoginRequest user) {
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
}
