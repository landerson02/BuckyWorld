package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "USERS")
public class User {
    public User() {
        points = 0;
    }

    public User(String username, String password){
        this();
        this.username = username; 
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "POINTS")
    private int points;

    @Column(name = "PASSWORD") //Temporary addition since uID is the only distinct identifier for users and the only other thing to differentiate users so far was username
    private String password;

    public void setUsername(String username){
        this.username = username;
    }

    public String getUsername(){
        return username;
    }

    public void setUserID(long userID){
        this.id = userID;
    }
    
    public long getUserID(){
        return id;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getPoints() {
        return points;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //ALSO TEMPORARY DON'T WORRY
    public String getPassword() {
        return password;
    }
}
