package com.t13.buckyworld;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LandmarkControllerTest {

    @Mock
    private LandmarkService landmarkService;

    @InjectMocks
    private LandmarkController landmarkController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLandmarkById() {
        // Given
        long landmarkId = 1L;
        Landmark expectedLandmark = new Landmark(landmarkId, "Test Location", 10.0, 20.0, "http://example.com/image.jpg", "A description", 0);
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
    public void testGetLandmarks() {
        // Given
        List<Landmark> expectedLandmarks = Arrays.asList(
                new Landmark(1L, "Location 1", 10.0, 20.0, "http://example.com/image1.jpg", "Description 1", 10),
                new Landmark(2L, "Location 2", 30.0, 40.0, "http://example.com/image2.jpg", "Description 2", 20)
        );
        when(landmarkService.getAllLandmarks()).thenReturn(expectedLandmarks);

        // When
        List<Landmark> result = landmarkController.getLandmarks();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLandmarks.get(0).getLandmarkName(), result.get(0).getLandmarkName());
        assertEquals(expectedLandmarks.get(1).getLandmarkName(), result.get(1).getLandmarkName());
    }
}
