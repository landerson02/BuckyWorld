package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class LocationController {
    private LocationService locationService;

    public LocationController(LocationService locationService){
        this.locationService = locationService;
    }

    @GetMapping("/location")
    public Location getLocationById(@RequestParam("id") Long id) {
        return locationService.getLocationById(id).orElse(null);
    }
    @GetMapping("/locations")
    public List<Location> getLocations(){
        List<Location> locations = locationService.getAllLocations();
        return locations;
    }
    
}
