package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;


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
    public ResponseEntity<?> attendLandmark(@RequestParam Long userId, @RequestParam Long landmarkId) { 
        boolean result = attendedService.attendLandmark(userId, landmarkId);
        if(result){
            return ResponseEntity.ok("Landmark Attended Successfully");
        }
        else{
            return ResponseEntity.badRequest().body("Already attended within last 24 hours");
        }
    }
    

}
