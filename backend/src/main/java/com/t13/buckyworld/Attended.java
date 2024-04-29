package com.t13.buckyworld;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

/**
 * Represents an attendance record for a user at a specific landmark.
 * This class encapsulates the user ID, landmark ID, attendance ID, and the time of attendance.
 * It provides a convenient way to store and retrieve information about user attendance.
 */
@Entity
@Table(name = "ATTENDED")
public class Attended {
    public Attended() {


    }

    public Attended(long attendedId, long userId, long landmarkId){
        this.attendedId = attendedId;
        this.userId = userId;
        this.landmarkId = landmarkId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long attendedId;

    @Column(name = "USERID")
    private long userId;

    @Column(name = "LANDMARKID")
    private long landmarkId;

    @Column(name = "ATTENDTIME")
    private LocalDateTime attendTime;


    public void setUserId(long userId){
        this.userId = userId;
    }

    public long getUserId(){
        return userId;
    }

    public void setLandmarkID(long landmarkId){
        this.landmarkId =  landmarkId;
    }
    
    public long getLandmarkID(){
        return landmarkId;
    }

    public void setAttendTime(LocalDateTime attendTime){
        this.attendTime = attendTime;
    }
    
    public LocalDateTime getAttendTime(){
        return attendTime;
    }
}
