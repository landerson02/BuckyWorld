package com.t13.buckyworld;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LandmarkService {
    @Autowired
    private LandmarkRepository landmarkRepository;
    public LandmarkService(){

    }
    public Optional<Landmark> getLandmarkById(Long id) {
        return landmarkRepository.findById(id);
    }
    public List<Landmark> getAllLandmarks() {
        return landmarkRepository.findAll();
    }

    /**
     * saves landmark to the db
     * @param landmark
     * @return
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
