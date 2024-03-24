package com.t13.buckyworld;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    //Refer to UserService.java
    List<User> findTop10ByOrderByPointsDesc();
    User findByUsername(String username);
}
