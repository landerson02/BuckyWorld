package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "ATTENDED")
public class Attended {
    public Attended() {


    }

    public Attended(long attendedId, String username, long eventId){
        this.attendedId = attendedId;
        this.username = username;
        this.eventId = eventId;
    }

    @Id
    @Column(name = "ID")
    private long attendedId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "EVENTID")
    private long eventId;


    public void setUsername(String username){
        this.username = username;
    }

    public String getUsername(){
        return username;
    }

    public void setEventID(long eventId){
        this.eventId = eventId;
    }
    
    public long getEventID(){
        return eventId;
    }
}
