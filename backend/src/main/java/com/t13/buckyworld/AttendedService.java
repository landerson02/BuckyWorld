package com.t13.buckyworld;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Service class responsible for managing user attendance at landmarks
 * Acts as an intermediary between AttendedController and AttendedRepository to process requests
 */
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
     * Records a user's attendance at a landmark
     * 
     * @param username The username of the user attending the landmark
     * @param landmarkId The ID of the landmark being attended
     * @return False if the user has attended the specified landmark in the last 24 hours,
     *         True for successful attendance
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
