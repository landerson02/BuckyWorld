package com.t13.buckyworld;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findTop10ByOrderByPointsDesc();
}