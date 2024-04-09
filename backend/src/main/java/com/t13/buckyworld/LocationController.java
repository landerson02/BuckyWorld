package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;



@RestController
public class LocationController {
    private LocationService locationService;

    public LocationController(LocationService locationService){
        this.locationService = locationService;
    }

    // @GetMapping("/location")
    // public Location getLocationById(@RequestParam("id") Long id) {
    //     return locationService.getLocationById(id).orElse(null);
    // }
    @GetMapping(value = "/location", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Location getLocationById(@RequestParam("id") Long id) {
        // return locationService.getLocationById(id).orElse(null);
        System.out.println("Received request for location with id: " + id);
        Location location = locationService.getLocationById(id).orElse(null);
        System.out.println("Returning location: " + location);
        return location;
    }

    @GetMapping("/locations")
    public List<Location> getLocations(){
        List<Location> locations = locationService.getAllLocations();
        return locations;
    }


}
