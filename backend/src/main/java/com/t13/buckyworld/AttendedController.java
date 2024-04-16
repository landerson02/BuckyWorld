package com.t13.buckyworld;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;


@RestController
public class AttendedController {

    private AttendedService attendedService;

    public AttendedController(AttendedService attendedService) {
        this.attendedService = attendedService;
    }

  
    /**
     * 
     * adds a attended record to the db
     * 
     * @param attendedRequest
     * @return
     */
    @PostMapping("/saveattended")
    public ResponseEntity<Attended> addLandmark(@RequestBody AttendedRequest attendedRequest) {

        // create a landmark from attributes passed
        Attended attended = new Attended(
            attendedRequest.getAttendedId(),
            attendedRequest.getUserId(),
            attendedRequest.getLandmarkId()
            );
        return attendedService.saveAttended(attended);
    }

}
