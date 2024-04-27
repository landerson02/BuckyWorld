package com.t13.buckyworld;

import java.util.List;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserControllerTest {

    //Creates userService object to be mocked
    @Mock
    private UserService userService;

    //Specifies that mocks will be used in userController
    @InjectMocks
    private UserController userController;

    //Sets up mock environment before each test
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//---------------------------------------SAVE USER TESTS------------------------------------------

    /**
     * Tests the saveUser() function in userController when a successful request is made
     */
    @Test
    public void testSaveUser_Success() {
        //Create successful login request
        LoginRequest loginRequest = new LoginRequest("testUser", "testPassword");

        //Define mock behavior for userService.saveUser()
        when(userService.saveUser("testUser", "testPassword"))
            .thenReturn(ResponseEntity.ok().build());

        //Verify response from userController.saveUser()
        ResponseEntity<User> responseEntity = userController.saveUser(loginRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

    /**
     * Tests the saveUser() function in userController when trying to save a user that already
     * exists
     */
    @Test
    public void testSaveUser_Conflict() {
        //Create original login request
        LoginRequest loginRequest = new LoginRequest("testUser", "testPassword");
        
        //Create conflicting login request with the same username
        LoginRequest conflictRequest = new LoginRequest("testUser", "differentPassword");

        //Define mock beavior for userSErvice.saveUser()
        when(userService.saveUser("testUser", "testPassword"))
            .thenReturn(ResponseEntity.ok().build());
        when(userService.saveUser("testUser", "differentPassword"))
            .thenReturn(new ResponseEntity<>(null, HttpStatus.CONFLICT));

        //Verify the response for the successful login request
        ResponseEntity<User> responseEntity = userController.saveUser(loginRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());

        //Verify the response for the conflicting login request
        ResponseEntity<User> conflictEntity = userController.saveUser(conflictRequest);
        assertEquals(HttpStatus.CONFLICT, conflictEntity.getStatusCode());
        assertEquals(null, conflictEntity.getBody());
    }

    /**
     * Tests the saveUser() function in userController when a request with null or empty username
     * is made
     */
    @Test
    public void testSaveUser_BadRequest() {
        //Create login request with empty username
        LoginRequest emptyUsername = new LoginRequest("", "testPassword");

        //Create login request with null username
        LoginRequest nullUsername = new LoginRequest(null, "testPassword");

        //Define mock behavior for userService.saveUser() when an empty username is passed
        when(userService.saveUser(eq(""), anyString()))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());

        //Define mock behavior for userService.saveUser() when a null username is passed
        when(userService.saveUser(isNull(), anyString()))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());

        //Verify response for empty username
        ResponseEntity<User> emptyUsernameResponse = userController.saveUser(emptyUsername);
        assertEquals(HttpStatus.BAD_REQUEST, emptyUsernameResponse.getStatusCode());
        assertEquals(null, emptyUsernameResponse.getBody());
        
        //Verify response for null username
        ResponseEntity<User> nullUsernameResponse = userController.saveUser(nullUsername);
        assertEquals(HttpStatus.BAD_REQUEST, nullUsernameResponse.getStatusCode());
        assertEquals(null, nullUsernameResponse.getBody());

    }

//-----------------------------------------LOGIN TESTS--------------------------------------------

    /**
     * Tests the login() function in userController when a successful request is made
     */
    @Test
    public void testLogin_Success() {
        //Create login request
        LoginRequest loginRequest = new LoginRequest("testUsername", "testPassword");
        
        //Create user object
        User user = new User("testUsername", "testPassword");

        //Define mock behavior for userService.login()
        when(userService.login("testUsername", "testPassword"))
            .thenReturn(ResponseEntity.ok(user));

        //Verify response for successful login request
        ResponseEntity<User> responseEntity = userController.login(loginRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(user, responseEntity.getBody());
    }

    /**
     * Tests the login() function in userController when a request with null or empty username
     * is made
     */
    @Test
    public void testLogin_BadRequest() {
        //Create login request with empty username
        LoginRequest emptyUsername = new LoginRequest("", "testPassword");
        
        //Create login request with null username
        LoginRequest nullUsername = new LoginRequest(null, "testPassword");

        //Define mock behavior for userService.login() for empty username
        when(userService.login(eq(""), anyString()))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());

        //Define mock behavior for userService.login() for null username
        when(userService.login(isNull(), anyString()))
            .thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());

        //Verify response for empty username
        ResponseEntity<User> emptyUsernameResponse = userController.login(emptyUsername);
        assertEquals(HttpStatus.BAD_REQUEST, emptyUsernameResponse.getStatusCode());
        assertEquals(null, emptyUsernameResponse.getBody());
        
        //Verify response for null username
        ResponseEntity<User> nullUsernameResponse = userController.login(nullUsername);
        assertEquals(HttpStatus.BAD_REQUEST, nullUsernameResponse.getStatusCode());
        assertEquals(null, nullUsernameResponse.getBody());
    }

    /**
     * Tests the login() function in userController when a user is not found
     */
    @Test
    public void testLogin_NotFound() {
        //Create login request
        LoginRequest userNotFound = new LoginRequest("wrongUsername", "testPassword");

        //Define mock behavior for userService.login()
        when(userService.login("wrongUsername", "testPassword"))
            .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).build());

        //Verify response for user not found
        ResponseEntity<User> userNotFoundEntity = userController.login(userNotFound);
        assertEquals(HttpStatus.NOT_FOUND, userNotFoundEntity.getStatusCode());
        assertEquals(null, userNotFoundEntity.getBody());
    }

    /**
     * Tests the login() function in userController when a request with the incorrect password is
     * made
     */
    @Test
    public void testLogin_Unauthorized() {
        //Create login request with "incorrect" password
        LoginRequest loginRequest = new LoginRequest("testUsername", "testPassword");

        //Define mock behavior for userService.login() for incorrect password
        when(userService.login("testUsername", "testPassword"))
            .thenReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());

        //Verify response for unauthorized request
        ResponseEntity<User> responseEntity = userController.login(loginRequest);
        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

//-------------------------------------UPDATE POINTS TESTS----------------------------------------

    /**
     * Tests the updatePoints() function in userController when the specified user is not found
     */
    @Test
    public void testUpdatePoints_NotFound() {
        //Create login request for invalid user
        LoginRequest loginRequest = new LoginRequest("testUsername", "testPassword");
        
        //Points to be given
        int points = 10;

        //Define mock behavior for userService.updatePoints() for user not found
        when(userService.updatePoints(anyInt(), eq("testUsername")))
            .thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).build());

        //Verify response for user not found
        ResponseEntity<User> responseEntity = userController.updatePoints(points, loginRequest);        
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals(null, responseEntity.getBody());
    }

    /**
     * Tests the updatePoints() function in userController when a successful request is made
     */
    @Test
    public void testUpdatePoints_Success() {
        //Create login request for valid user
        LoginRequest loginRequest = new LoginRequest("testUsername", "testPassword");
        
        //Points to be given
        int points = 10;
        
        //Create expected user object for success
        User expectedUser = new User("testUsername", "testPassword");
        
        //Add points to expected outcome
        expectedUser.setPoints(points);

        //Define mock behavior for userService.updatePoints() for successful output
        when(userService.updatePoints(anyInt(), eq("testUsername")))
                .thenReturn(ResponseEntity.ok(expectedUser));

        //Verify response for successful request
        ResponseEntity<User> responseEntity = userController.updatePoints(points, loginRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedUser, responseEntity.getBody());
        assertEquals(points, expectedUser.getPoints());
    }

//-----------------------------------GET TOP 10 USERS TESTS---------------------------------------

    /**
     * Tests the getTop10Users() function in userController when the leaderboard has at least ten
     * users
     */
    @Test
    public void testGetTop10Users_FullTop10() {
        //Create expected leaderboard with 10 distinct users
        ArrayList<User> expectedUsers = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            User user = new User(Integer.toString(i), "");
            expectedUsers.add(user);
        }
        //Define mock behavior for userSErvice.getTop10UsersByPoints for full top 10
        when(userService.getTop10UsersByPoints()).thenReturn(expectedUsers);

        //Verify response for full top 10
        List<User> output = userController.getTop10Users();
        assertEquals(output.size(), expectedUsers.size());
        for (int i = 0; i < output.size(); i++) {
            assertEquals(Integer.parseInt(output.get(i).getUsername()), i);
        }
    }

    /**
     * Tests the getTop10Users() function in userController when the leaderboard has less than
     * ten users
     */
    @Test
    public void testGetTop10Users_PartiallyFullTop10() {
        //Create expected leaderboard with 6 distinct users (Any number 0 < x < 10 works)
        ArrayList<User> expectedUsers = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            User user = new User(Integer.toString(i), "");
            expectedUsers.add(user);
        }
        //Define mock behavior for userService.getTop10UsersByPoints() for partially full top 10
        when(userService.getTop10UsersByPoints()).thenReturn(expectedUsers);

        //Verify response for partially full top 10
        List<User> output = userController.getTop10Users();
        assertEquals(output.size(), expectedUsers.size());
        for (int i = 0; i < output.size(); i++) {
            System.out.println(output.get(i).getUsername());
            System.out.println(i);
            assertEquals(Integer.parseInt(output.get(i).getUsername()), i);
        }
    }

    /**
     * Tests the getTop10Users() function in userController when the leaderboard has no users
     */
    @Test
    public void testGetTop10Users_EmptyTop10() {
        //Create expected leaderboard with no users
        ArrayList<User> expectedUsers = new ArrayList<>();
        
        //Define mock behavior for userService.getTop10UsersByPoints() for empty top 10
        when(userService.getTop10UsersByPoints()).thenReturn(expectedUsers);

        //Verify response for empty top 10
        List<User> output = userController.getTop10Users();
        assertNotNull(output);
        assertEquals(output.size(), expectedUsers.size());
    }

//-----------------------------------GET USER RANKING TESTS---------------------------------------

    /**
     * Tests the getUserRanking() function in userController when the user is not found
     */
    @Test
    public void testGetUserRanking_NotFound() {
        //Create username for user not found
        String username = "testUsername";

        //Define mock behavior for userService.getLeaderboardPosition() when the user is not found
        when(userService.getLeaderboardPosition("testUsername")).thenReturn(-1);

        //Verify response for user not found
        int output = userController.getUserRanking(username);
        assertEquals(-1, output);
    }

    /**
     * Tests the getUserRanking() function in userController when a successful request is made
     */
    @Test
    public void testGetUserRanking_Success() {
        //Create username for successful request
        String username = "testUsername";
        
        //Create test leaderboard position
        int position = 4;

        //Define output for userService.getLeaderboardPosition() for successful request
        when(userService.getLeaderboardPosition("testUsername")).thenReturn(position);

        //Verify response for valid request
        int output = userController.getUserRanking(username);
        assertEquals(position, output);
    }
}