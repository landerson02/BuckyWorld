package com.t13.buckyworld;

/**
 *  Request for modifiying attended table
 * 
 * */ 
public class AttendedRequest {

    private String username; 
    private long landmarkId; 


    /**
     * creates a new request
     * @param username
     * @param landmarkId
     */
    public AttendedRequest(String username, long landmarkId){
        this.username = username;
        this.landmarkId = landmarkId;

    }

    /** 
     * @return username
     */
    public String getUsername() {
        return this.username;
    }

    /** 
     * @param username
     * sets username to value of param
     */

    public void setUsername(String username) {
        this.username = username;
    }

    /** 
     * @return eventId
     */
    public long getLandmarkId() {
        return this.landmarkId;
    }

    
    /** 
     * @param landmarkId
     * sets landmarkId to value of param
     */
    public void setLandmarkId(long landmarkId) {
        this.landmarkId = landmarkId;
    }



    
}
