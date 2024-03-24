package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Optional;


@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    //Controller method to call UserService.java saveUser() method. Refer to UserService.java for documentation
    //Change RequestParam to RequestHeader for some fields to make more secure later
    @PostMapping("/save-user")
    public ResponseEntity<User> saveUser(@RequestBody LoginRequest loginRequest) {
        return userService.saveUser(loginRequest.getUsername(), loginRequest.getPassword());
    }
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest.getUsername(), loginRequest.getPassword());
    }
}
