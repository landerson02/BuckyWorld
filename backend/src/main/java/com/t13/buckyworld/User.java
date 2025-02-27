package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * User entity representing a user with their login information and their points
 */
@Entity
@Table(
    name = "USERS",
    uniqueConstraints=@UniqueConstraint(columnNames={"USERNAME"})
    
)
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

    @Column(name = "PASSWORD") 
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

    public String getPassword() {
        return password;
    }
}
