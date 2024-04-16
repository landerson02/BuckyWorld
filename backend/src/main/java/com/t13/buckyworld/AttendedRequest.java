package com.t13.buckyworld;

/**
 *  Request for modifiying attended table
 * 
 * */ 
public class AttendedRequest {

    private long attendedId; // id of attended table
    private long userId; // user id
    private long landmarkId; 


    /**
     * creates a new request
     * @param attendedId
     * @param userId
     * @param landmarkId
     */
    public AttendedRequest(long attendedId, long userId, long landmarkId){
        this.attendedId = attendedId;
        this.userId = userId;
        this.landmarkId = landmarkId;

    }
    
    /** 
     * @return attendedId
     */
    public long getAttendedId() {
        return this.attendedId;
    }

    /** 
     * @param attendedId
     * sets eventId to value of param
     */
    public void setAttendedId(long attendedId) {
        this.attendedId = attendedId;
    }

    /** 
     * @return userId
     */
    public long getUserId() {
        return this.userId;
    }

    /** 
     * @param userId
     * sets userId to value of param
     */

    public void setUserId(long userId) {
        this.userId = userId;
    }

    /** 
     * @return eventId
     */
    public long getLandmarkId() {
        return this.landmarkId;
    }

    
    /** 
     * @param eventId
     * sets eventId to value of param
     */
    public void setEventId(long landmarkId) {
        this.landmarkId = landmarkId;
    }



    
}
