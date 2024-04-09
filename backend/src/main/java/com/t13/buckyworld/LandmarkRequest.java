package com.t13.buckyworld;

public class LandmarkRequest {
    private String name;
    private double longitude;
    private double latitude;
    private String url; // URL should be a String, not double
    private int points;
    private String description;

    /**
     * creates a landmark request
     * 
     */ 
    public LandmarkRequest(String name, double longitude, double latitude, String url, String description, int points) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.url = url;
        this.points = points;
        this.description = description;
    }

    /** 
     * @return String
     */
    public String getName() {
        return name;
    }
    
    /** 
     * set name
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     *  @return longitude
     */
    public double getLongitude() {
        return longitude;
    }

    // Setter for longitude
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

     /**
     *  @return latitude
     */
    // Getter for latitude
    public double getLatitude() {
        return latitude;
    }

     /**
     *  set latitude
     */
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

     /**
     *  @return url
     */
    public String getUrl() {
        return url;
    }

     /**
     *  set longitude
     */
    public void setUrl(String url) {
        this.url = url;
    }

     /**
     *  set description
     */
    public void setDescription(String description){
        this.description = description;
    }

    /**
     * @return description
     */
    public String getDescription(){
        return description;
    }
     /**
     *  @return points
     */
    public int getPoints() {
        return points;
    }

     /**
     *  set points
     */
    public void setPoints(int points) {
        this.points = points;
    }
}
