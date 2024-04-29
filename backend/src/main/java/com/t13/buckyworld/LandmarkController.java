package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import org.springframework.http.MediaType;

/**
 * Controller class made to receive landmark
 * Receives requests for locations from frontend
 * Sends input to LandmarkService for processing
 */
@RestController
public class LandmarkController {
    private LandmarkService landmarkService;

    public LandmarkController(LandmarkService landmarkService) {
        this.landmarkService = landmarkService;
    }

    /**
     * Finds a landmark in the database with the corresponding ID
     * @param id the ID of the landmark being searched for
     * @return Landmark object if found, null if not found
     */
    @GetMapping(value = "/landmark", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Landmark getLandmarkById(@RequestParam("id") Long id) {
        // return locationService.getLocationById(id).orElse(null);
        System.out.println("Received request for landmark with id: " + id);
        Landmark landmark = landmarkService.getLandmarkById(id).orElse(null);
        System.out.println("Returning landmark: " + landmark);
        return landmark;
    }

    @GetMapping("/landmarks")
    public List<Landmark> getLandmarks() {
        List<Landmark> landmarks = landmarkService.getAllLandmarks();
        return landmarks;
    }

    /**
     * 
     * 
     * @param landmarkRequest
     * @return
     */
    @PostMapping("/addlandmark")
    public ResponseEntity<Landmark> addLandmark(@RequestBody Landmark landmark) {
        return landmarkService.saveLandmark(landmark);
    }

}
