package com.t13.buckyworld;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for finding landmarks in the MySQL database
 * Acts as an intermediary between LandmarkController and LandmarkRepository to process requests
 */
@Service
public class LandmarkService {
    //Landmark Repository object to access the database
    @Autowired
    private LandmarkRepository landmarkRepository;

    public LandmarkService(){

    }
    /**
     * Finds a landmark in the database with the corresponding ID
     * @param id The ID of the landmark being searched for
     * @return A landmark object with the specified landmark, null otherwise
     */
    public Optional<Landmark> getLandmarkById(Long id) {
        return landmarkRepository.findById(id);
    }

    /**
     * Creates and returns a list of all the landmarks in the database
     * @return A list containing all the landmarks in the databse
     */
    public List<Landmark> getAllLandmarks() {
        return landmarkRepository.findAll();
    }

    /**
     * Saves a landmark to the database
     * @param landmark The landmark to be saved
     * @return HTTP code 200 if successful, code 500 if failure (Database error)
     */
    public ResponseEntity<Landmark> saveLandmark(Landmark landmark){
        try{
            landmarkRepository.save(landmark);
            // successful
            return ResponseEntity.ok().build();
        }catch(Exception e){
            // db error (500)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            

        }
        
    }
    
    public void deleteLandmark(Long id) {
        landmarkRepository.deleteById(id);
    }
}
