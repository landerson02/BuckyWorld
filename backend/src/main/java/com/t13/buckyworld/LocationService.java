package com.t13.buckyworld;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;
    public LocationService(){

    }
    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
}
