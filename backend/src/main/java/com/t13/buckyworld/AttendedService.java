package com.t13.buckyworld;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;
import org.springframework.http.ResponseEntity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendedService {

    @Autowired
    private AttendedRepository attendedRepository;

    public AttendedService(){

    }
 
    /**
     * records the user and corresponding landmark visited
     * @param attendedRecord
     * @return
     */
    public ResponseEntity<Attended> saveAttended(Attended attendedRecord) {
        attendedRepository.save(attendedRecord);
        return ResponseEntity.ok().build(); // Code 200
    }
    

}
