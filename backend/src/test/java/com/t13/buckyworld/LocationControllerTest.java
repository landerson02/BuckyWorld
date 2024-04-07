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
public class LocationControllerTest {

    @Mock
    private LocationService locationService;

    @InjectMocks
    private LocationController locationController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLocationById() {
        // Given
        long locationId = 1L;
        Location expectedLocation = new Location(locationId, "Test Location", 10.0, 20.0, "http://example.com/image.jpg", "A description");
        when(locationService.getLocationById(locationId)).thenReturn(Optional.of(expectedLocation));

        // When
        Location result = locationController.getLocationById(locationId);

        // Then
        assertNotNull(result);
        assertEquals(expectedLocation.getLocationName(), result.getLocationName());
        assertEquals(expectedLocation.getLatitude(), result.getLatitude());
        assertEquals(expectedLocation.getLongitude(), result.getLongitude());
        assertEquals(expectedLocation.getPictureUrl(), result.getPictureUrl());
        assertEquals(expectedLocation.getDescription(), result.getDescription());
    }

    @Test
    public void testGetLocations() {
        // Given
        List<Location> expectedLocations = Arrays.asList(
                new Location(1L, "Location 1", 10.0, 20.0, "http://example.com/image1.jpg", "Description 1"),
                new Location(2L, "Location 2", 30.0, 40.0, "http://example.com/image2.jpg", "Description 2")
        );
        when(locationService.getAllLocations()).thenReturn(expectedLocations);

        // When
        List<Location> result = locationController.getLocations();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(expectedLocations.get(0).getLocationName(), result.get(0).getLocationName());
        assertEquals(expectedLocations.get(1).getLocationName(), result.get(1).getLocationName());
    }
}
