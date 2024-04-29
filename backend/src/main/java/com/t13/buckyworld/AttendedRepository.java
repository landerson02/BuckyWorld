package com.t13.buckyworld;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface to process repository requests made in AttendedService
 * Queries Buckymongo MySQL database for information
 */
public interface AttendedRepository extends JpaRepository<Attended, Long>{

    /**
     * Queries the database for attendance requests for a user at a location after
     * a specified time
     * @param userId The ID of the user being searched for
     * @param landmarkId The ID of the landmark being searched for
     * @param time The earliest time being searched for
     * @return An attendance record if the user attended after the specified time,
     *         null if no attendance was found after the time
     */
    Optional<Attended> findByUserIdAndLandmarkIdAndAttendTimeAfter(Long userId, Long landmarkId, 
        LocalDateTime time);
}
