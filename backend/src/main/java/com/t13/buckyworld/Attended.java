package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;


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


    public void setUsername(long userId){
        this.userId = userId;
    }

    public long getUserId(){
        return userId;
    }

    public void setEventID(long landmarkId){
        this.landmarkId =  landmarkId;
    }
    
    public long getEventID(){
        return landmarkId;
    }
}
