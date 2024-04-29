package com.t13.buckyworld;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface to process repository requests made in LocationService
 * Queries Buckymongo MySQL database for information
 */
public interface LandmarkRepository extends JpaRepository<Landmark, Long> {

}
