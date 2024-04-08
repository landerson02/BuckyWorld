package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.MediaType;


@RestController
public class LandmarkController {
    private LandmarkService landmarkService;

    public LandmarkController(LandmarkService landmarkService){
        this.landmarkService = landmarkService;
    }

    // @GetMapping("/location")
    // public Location getLocationById(@RequestParam("id") Long id) {
    //     return locationService.getLocationById(id).orElse(null);
    // }
    @GetMapping(value = "/landmark", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Landmark getLandmarkById(@RequestParam("id") Long id) {
        // return locationService.getLocationById(id).orElse(null);
        System.out.println("Received request for landmark with id: " + id);
        Landmark landmark = landmarkService.getLandmarkById(id).orElse(null);
        System.out.println("Returning landmark: " + landmark);
        return landmark;
    }

    @GetMapping("/landmarks")
    public List<Landmark> getLandmarks(){
        List<Landmark> landmarks = landmarkService.getAllLandmarks();
        return landmarks;
    }
    
}
