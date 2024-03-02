package com.t13.buckyworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LocationController {

    @GetMapping("/location")
    public Location getLocation(@RequestParam String loc) {
        Location location = new Location();
        location.setLocationName(loc);
        location.setLatitude(43.075388);
        location.setLongitude(-89.398991);
        location.setPictureUrl("");
        return location;
    }
}
