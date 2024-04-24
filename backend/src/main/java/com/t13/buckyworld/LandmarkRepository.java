package com.t13.buckyworld;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LandmarkRepository extends JpaRepository<Landmark, Long> {

}
