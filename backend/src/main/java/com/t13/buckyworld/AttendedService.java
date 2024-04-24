package com.t13.buckyworld;

import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

@Service
public class AttendedService {

    @Autowired
    private AttendedRepository attendedRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LandmarkService landmarkService;

    public AttendedService(){

    }
 

    /**
     * 
     * @param userId
     * @param landmarkId
     * @return
     */
    public boolean attendLandmark(String username, Long landmarkId){

        Optional<Landmark> landmark = landmarkService.getLandmarkById(landmarkId);
        Optional<User> user = userRepository.findByUsername(username);
        Long userId = userRepository.findIdByUsername(username);

        if (user.isPresent() && landmark.isPresent()){
            LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
            Optional<Attended> lastAttendTime = attendedRepository.findByUserIdAndLandmarkIdAndAttendTimeAfter(userId, landmarkId, yesterday);
            if (lastAttendTime.isPresent()){
                return false;
            }
            Attended attended = new Attended();
            attended.setUserId(userId);
            attended.setLandmarkID(landmarkId);
            attended.setAttendTime(LocalDateTime.now());
            attendedRepository.save(attended);
            userService.updatePoints(landmark.get().getPoints(), user.get().getUsername());
            return true;
        }
        return false;
    }
    

}
