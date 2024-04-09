package com.t13.buckyworld;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

/**
 * Landmark entity represents a landmark with its geographical and descriptive data.
 */
@Entity
@Table(name = "Landmark")
public class Landmark {
    /**
     * Default constructor for Landmark.
     */
    public Landmark() {
    }

    /**
     * Constructs a new Landmark with the specified details.
     *
     * @param locationName Name of the landmark location.
     * @param latitude     The latitude of the landmark.
     * @param longitude    The longitude of the landmark.
     * @param pictureUrl   URL of the landmark's picture.
     * @param description  A description of the landmark.
     * @param points       Points associated with the landmark.
     */
    public Landmark(String locationName, double latitude, double longitude, String pictureUrl, String description, int points) {
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

    /**
     * Gets the name of the landmark.
     *
     * @return The landmark name.
     */
    public String getLandmarkName() {
        return locationName;
    }

    /**
     * Sets the name of the landmark.
     *
     * @param locationName The name to set for the landmark.
     */
    public void setLandmarkName(String locationName) {
        this.locationName = locationName;
    }

    /**
     * Gets the latitude of the landmark.
     *
     * @return The latitude value.
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * Sets the latitude of the landmark.
     *
     * @param latitude The latitude value to set.
     */
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    /**
     * Gets the longitude of the landmark.
     *
     * @return The longitude value.
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * Sets the longitude of the landmark.
     *
     * @param longitude The longitude value to set.
     */
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    /**
     * Gets the picture URL of the landmark.
     *
     * @return The URL of the picture.
     */
    public String getPictureUrl() {
        return pictureUrl;
    }

    /**
     * Sets the picture URL of the landmark.
     *
     * @param pictureUrl The URL to set for the picture.
     */
    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    /**
     * Gets the description of the landmark.
     *
     * @return The landmark's description.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description for the landmark.
     *
     * @param description The description to set for the landmark.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets the points associated with the landmark.
     *
     * @return The points associated with the landmark.
     */
    public int getPoints() {
        return this.points;
    }

    /**
     * Sets the points associated with the landmark.
     *
     * @param points The points to set for the landmark.
     */
    public void setPoints(int points) {
        this.points = points;
    }
}
