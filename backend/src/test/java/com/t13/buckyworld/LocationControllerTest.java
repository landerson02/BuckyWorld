package com.t13.buckyworld;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;
import static org.hamcrest.Matchers.hasSize;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LocationController.class)
public class LocationControllerTest {

    @Autowired
    private MockMvc mockMvc;

     @MockBean
    private LocationService locationService;

    // @Test
    // public void testGetLocation() throws Exception {
    //     mockMvc.perform(get("/api/location")
    //             .param("loc", "TestLocation"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.locationName").value("TestLocation"))
    //             .andExpect(jsonPath("$.latitude").value(43.075388))
    //             .andExpect(jsonPath("$.longitude").value(-89.398991))
    //             .andExpect(jsonPath("$.pictureUrl").value(""));
    // }
    @Test
    public void testGetLocationById() throws Exception {
        // Assuming a valid location with id 1
        mockMvc.perform(get("/location").param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Add assertions for the Location object properties
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Location"))
                ;
    }

    @Test
    public void testGetAllLocations() throws Exception {
        mockMvc.perform(get("/locations"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Add assertions for the list of Location objects
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Test Location 1"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Test Location 2"))
                // Add more assertions as needed
                ;
    }
}
