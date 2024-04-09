package com.t13.buckyworld;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Landmark saveLandmark(Landmark landmark) {
        return landmarkRepository.save(landmark);
    }
    public void deleteLandmark(Long id) {
        landmarkRepository.deleteById(id);
    }
}
