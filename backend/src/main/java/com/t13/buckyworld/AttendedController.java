package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

/**
 * Controller class made to receive attendance requests
 * Receives attendance communication from frontend
 * Sends input to AttendedService for processing
 */
@RestController
public class AttendedController {

    
    private AttendedService attendedService;

    public AttendedController(AttendedService attendedService) {
        this.attendedService = attendedService;
    }

    /**
     * 
     * @param userId Id of the user that is attending the landmark
     * @param landmarkId Id of the landmark that is being attended
     * @return whether the call was successfull or not
     */
    @PostMapping("/attend")
    public ResponseEntity<?> attendLandmark(@RequestBody AttendedRequest attendedRequest) { 
        boolean result = attendedService.attendLandmark(attendedRequest.getUsername(), 
            attendedRequest.getLandmarkId());
        if(result){
            return ResponseEntity.ok("Landmark Attended Successfully");
        }
        else{
            return ResponseEntity.badRequest().body("Already attended within last 24 hours");
        }
    }
    

}
