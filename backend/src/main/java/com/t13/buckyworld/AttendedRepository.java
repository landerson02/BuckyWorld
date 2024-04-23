package com.t13.buckyworld;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendedRepository extends JpaRepository<Attended, Long>{

    Optional<Attended> findByUserAndLandmarkAndAttendTimeAfter(Long userId, Long landmarkId, LocalDateTime time);
}
