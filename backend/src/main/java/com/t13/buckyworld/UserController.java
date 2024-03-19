package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import java.util.Optional;


@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    //Controller method to call UserService.java saveUser() method. Refer to UserService.java for documentation
    //Change RequestParam to RequestHeader for some fields to make more secure later
    @GetMapping("/save-user")
    public int saveUser(@RequestParam("uID") long uID, @RequestParam("username") String username) {
        return userService.saveUser(uID, username);
    }
    @PostMapping("login")
    public Optional<User> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userService.login(username, password);
    }
}
