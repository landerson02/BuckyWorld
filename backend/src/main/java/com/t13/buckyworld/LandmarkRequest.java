package com.t13.buckyworld;

public class LandmarkRequest {
    private long id;
    private String name;
    private double longitude;
    private double latitude;
    private String url;
    private String description;

    /**
     * creates a landmark request
     * 
     */
    public LandmarkRequest(long id, String name, double longitude, double latitude, String url, String description) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.url = url;
        this.description = description;
    }

    /**
     * @return id
     */
    public long getId() {
        return id;
    }

    /**
     * @return String
     */
    public String getName() {
        return name;
    }

    /**
     * set name
     * 
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return longitude
     */
    public double getLongitude() {
        return longitude;
    }

    // Setter for longitude
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    /**
     * @return latitude
     */
    // Getter for latitude
    public double getLatitude() {
        return latitude;
    }

    /**
     * set latitude
     */
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    /**
     * @return url
     */
    public String getUrl() {
        return url;
    }

    /**
     * set longitude
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * set description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

}
