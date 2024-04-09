package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

@Entity
@Table(name = "Landmark")
public class Landmark {
    public Landmark(){
        
    }
    public Landmark(String locationName, double latitude, double longitude, String pictureUrl, String description, int points){
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pictureUrl = pictureUrl;
        this.description = description;
        this.points = points;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @Column(name = "NAME")
    private String locationName;

    @Column(name = "LATITUDE")
    private double latitude;

    @Column(name = "LONGITUDE")
    private double longitude;

    @Column(name = "URL")
    private String pictureUrl;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "POINTS")
    private int points;

    public String getLandmarkName() {
        return locationName;
    }
    public void setLandmarkName(String locationName) {
        this.locationName = locationName;
    }
    public double getLatitude() {
        return latitude;
    }
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
    public double getLongitude() {
        return longitude;
    }
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    public String getPictureUrl() {
        return pictureUrl;
    }
    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points){
        this.points = points;
    }

}
