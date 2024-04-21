package com.t13.buckyworld;

import java.beans.Transient;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.MockitoAnnotations;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.http.ResponseEntity;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.http.HttpStatus;





@WebMvcTest(LandmarkController.class)
public class LandmarkControllerTest {

    // @Mock
    // private LandmarkService landmarkService;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LandmarkService landmarkService;

    @InjectMocks
    private LandmarkController landmarkController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLandmarkById_ExistingLandmark() {
        // Given
        long landmarkId = 1;
        Landmark expectedLandmark = new Landmark(-1, "Test Landmark", 10.0, 20.0, "http://example.com/image.jpg",
                "A description", 0);
        when(landmarkService.getLandmarkById(landmarkId)).thenReturn(Optional.of(expectedLandmark));

        // When
        Landmark result = landmarkController.getLandmarkById(landmarkId);

        // Then
        assertNotNull(result);
        assertEquals(expectedLandmark.getLandmarkName(), result.getLandmarkName());
        assertEquals(expectedLandmark.getLatitude(), result.getLatitude());
        assertEquals(expectedLandmark.getLongitude(), result.getLongitude());
        assertEquals(expectedLandmark.getPictureUrl(), result.getPictureUrl());
        assertEquals(expectedLandmark.getDescription(), result.getDescription());
    }

    @Test
    public void testGetLandmarkById_NonExistingLandmark() {
        // Given
        long landmarkId = 1L;
        when(landmarkService.getLandmarkById(landmarkId)).thenReturn(Optional.empty());

        // When
        Landmark result = landmarkController.getLandmarkById(landmarkId);

        // Then
        assertNull(result);
    }

    @Test
    public void testGetLandmarks_MultipleLandmarks() {
        // Given
        List<Landmark> expectedLandmarks = Arrays.asList(
                new Landmark(-1, "Landmark 1", 10.0, 20.0, "http://example.com/image1.jpg", "Description 1", 0),
                new Landmark(-1, "Landmark 2", 30.0, 40.0, "http://example.com/image2.jpg", "Description 2", 0));
        when(landmarkService.getAllLandmarks()).thenReturn(expectedLandmarks);

        // When
        List<Landmark> result = landmarkController.getLandmarks();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLandmarks.get(0).getLandmarkName(), result.get(0).getLandmarkName());
        assertEquals(expectedLandmarks.get(1).getLandmarkName(), result.get(1).getLandmarkName());
    }

    @Test
    public void testGetLandmarks_EmptyList() {
        // Given
        when(landmarkService.getAllLandmarks()).thenReturn(Collections.emptyList());

        // When
        List<Landmark> result = landmarkController.getLandmarks();

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }


   /**
     * tests functionality of addLandmarks api call
     * @throws Exception
     */
    @Test
    public void testAddLandmarks() throws Exception {

        // given
        LandmarkRequest landmarkRequest = new LandmarkRequest(
            1L, 
            "Eiffel Tower", 
            2.2945, 
            48.8584, 
            "http://example.com/eiffel.jpg",
            100, 
            "Iconic French landmark located in Paris."
        );
        Landmark landmark = new Landmark(
            1L, 
            "Eiffel Tower", 
            48.8584, 
            2.2945, 
            "http://example.com/eiffel.jpg", 
            "Iconic French landmark located in Paris.", 
            100
        );

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequest;


        // create request
        try {

            // when
            jsonRequest = objectMapper.writeValueAsString(landmarkRequest);

        } catch (JsonProcessingException e) {
            fail("Failed to serialize landmarkRequest to JSON", e);
            return;
        }


        given(landmarkService.saveLandmark(landmark)).willReturn(ResponseEntity.ok().build());

        // then
        // mock post request and expect ok response
        mockMvc.perform(MockMvcRequestBuilders.post("/addlandmark")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andDo(MockMvcResultHandlers.print()) 
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    /**
     * tests how rejection is handled for landmark
     * 
     * @throws Exception
     */
    @Test
    public void testAddLandmarkDatabaseError() throws Exception {
    
        // Given
        LandmarkRequest landmarkRequest = new LandmarkRequest(
            2L, "Statue of Liberty", -74.0445, 40.6892, "http://example.com/liberty.jpg", 80, 
            "Famous American landmark in New York."
        );

        // Create JSON out of request
        // when
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequest = objectMapper.writeValueAsString(landmarkRequest);

        // Return an internal server error for any Landmark object
        given(landmarkService.saveLandmark(any(Landmark.class))).willReturn(
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        );

        // then
        // Perform the request
        mockMvc.perform(MockMvcRequestBuilders.post("/addlandmark")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isInternalServerError());
    }




}

