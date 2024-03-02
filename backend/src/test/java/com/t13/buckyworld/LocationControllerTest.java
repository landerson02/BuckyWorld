package com.t13.buckyworld;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LocationController.class)
public class LocationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetLocation() throws Exception {
        mockMvc.perform(get("/api/location")
                .param("loc", "TestLocation"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.locationName").value("TestLocation"))
                .andExpect(jsonPath("$.latitude").value(43.075388))
                .andExpect(jsonPath("$.longitude").value(-89.398991))
                .andExpect(jsonPath("$.pictureUrl").value(""));
    }
}
