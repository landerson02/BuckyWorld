package com.t13.buckyworld;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class LandmarkControllerTest {

    @Mock
    private LandmarkService LandmarkService;

    @InjectMocks
    private LandmarkController LandmarkController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLandmarkById_ExistingLandmark() {
        // Given
        long LandmarkId = 1L;
        Landmark expectedLandmark = new Landmark(LandmarkId, "Test Landmark", 10.0, 20.0, "http://example.com/image.jpg", "A description");
        when(LandmarkService.getLandmarkById(LandmarkId)).thenReturn(Optional.of(expectedLandmark));

        // When
        Landmark result = LandmarkController.getLandmarkById(LandmarkId);

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
        long LandmarkId = 1L;
        when(LandmarkService.getLandmarkById(LandmarkId)).thenReturn(Optional.empty());

        // When
        Landmark result = LandmarkController.getLandmarkById(LandmarkId);

        // Then
        assertNull(result);
    }

    @Test
    public void testGetLandmarks_MultipleLandmarks() {
        // Given
        List<Landmark> expectedLandmarks = Arrays.asList(
                new Landmark(1L, "Landmark 1", 10.0, 20.0, "http://example.com/image1.jpg", "Description 1"),
                new Landmark(2L, "Landmark 2", 30.0, 40.0, "http://example.com/image2.jpg", "Description 2")
        );
        when(LandmarkService.getAllLandmarks()).thenReturn(expectedLandmarks);

        // When
        List<Landmark> result = LandmarkController.getLandmarks();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLandmarks.get(0).getLandmarkName(), result.get(0).getLandmarkName());
        assertEquals(expectedLandmarks.get(1).getLandmarkName(), result.get(1).getLandmarkName());
    }

    @Test
    public void testGetLandmarks_EmptyList() {
        // Given
        when(LandmarkService.getAllLandmarks()).thenReturn(Collections.emptyList());

        // When
        List<Landmark> result = LandmarkController.getLandmarks();

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
}