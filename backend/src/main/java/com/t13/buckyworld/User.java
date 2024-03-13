package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "USERS")
public class User {
    public User() {


    }

    public User(long userID, String username){
        this.userId = userID;
        this.username = username;
    }

    @Id
    @Column(name = "ID")
    private long userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "POINTS")
    private int points;

    //Add references to password


    public void setUsername(String username){
        this.username = username;
    }

    public String getUsername(){
        return username;
    }

    public void setUserID(long userId){
        this.userId = userId;
    }
    
    public long getUserID(){
        return userId;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getPoints() {
        return points;
    }
}
