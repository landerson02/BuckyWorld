# Tutorial documentation
Coding Standards research/review: https://www.geeksforgeeks.org/coding-standards-and-guidelines/

Spring guides:
https://spring.io/guides
https://www.tutorialspoint.com/spring/spring_overview.htm
https://code.visualstudio.com/docs/java/java-spring-boot
https://spring.io/quickstart

# 2/25/24
- Started at 3:29PM
- https://www.baeldung.com/spring-controllers
- 30 min

# 2/26/24
- Started at 1:36PM
- Finishing location controller
- Added time sheet to gitlab
- 30 mins 

# 2/27/24
- Started at 1:00PM
- Making test class for location controller
- https://stackoverflow.com/questions/43911867/tests-for-spring-boot-application-are-not-run
- https://stackoverflow.com/questions/55145066/plugin-with-id-org-springframework-boot-not-found
- https://github.com/gradle/gradle/issues/19497
- 1 hour 42 minutes

# 3/2/24
- Merged Location.java, LocationController.java, LocationControllerTests.java to main
- 10 minutes

# 3/3/24
- Worked with Bora to resolve updates/merge conflicts to Location.java and LocationController.java
- Temporarily commented out tests until full backend implementation is finished.
- 20 minutes

# 3/5/24
- Started at 1:10
- Worked to setup remote access to the database or remotely hosting the entire application on a remote server.
- 1 hour 40 minutes

# 3/14/24
- Started at 3:30
- Worked for 1 hour
- Created Users mySQL table
- Created saveUser() method in UserController.java and UserService.java
- Added javadoc comments to UserController.java and UserService.java

# 3/17/24
- Worked for 20 minutes
- Fixed comments in UserService.java and UserController.java
- Commit id: 53013dc8

# 3/19/24
- Started at 5:06
- Added login() method to UserController and UserService
- Modified parameters for login() and saveUser() to be @RequestParam instead of normal parameters
- 1 hour

#3/24/24
- Changed saveUser() and login() to have correct request mapping
- Changed User so that ID is no longer the primary identifier
- Made username the primary identifier
- https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html
- https://www.baeldung.com/spring-response-entity
- Changed requests to take input from request body instead of url for saveUser() and login()
- 1 hour 30 minutes

#4/3/24
- https://stackoverflow.com/questions/41700798/error-message-gradlew-command-not-found
- https://www.baeldung.com/postman-testing-collections
- https://learning.postman.com/docs/sending-requests/response-data/troubleshooting-api-requests/
- https://support.postman.com/hc/en-us/articles/6920078647063-I-receive-an-ECONNREFUSED-error
- Attempted to test backend as LoginRequest class was giving issues
- 1 hour

# 4/4/24
- Troubleshooted issues with login() and saveUser() working on some people’s machines but not others
- Fixed a bug where saveUser() was not checking for empty password strings
- 1 hour 30 minutes
- Started working on making tests for UserController
- 30 mins

# 4/6/24
- Started making integration tests for UserController
- https://www.baeldung.com/spring-junit-failed-to-load-applicationcontext
- https://stackoverflow.com/questions/51299015/springboottest-no-qualifying-bean-of-type-org-springframework-test-web-servle
- https://stackoverflow.com/questions/51384800/nosuchbeandefinitionexception-no-qualifying-bean-of-type-available-expected-at
- https://stackoverflow.com/questions/70889359/unsatisfied-dependency-exception-error-creating-bean-with-name
- https://stackoverflow.com/questions/65903358/test-failure-java-lang-illegalstateexception-failed-to-load-applicationcontex
- 1 hour 30 minutes

# 4/8/24
- Updated login() and saveUser() to work with google auth
- 1 hour


# 4/9/24
- Troubleshooting docker
- Worked on updatePoints() method for UserController
- Troubleshooted getLocation() and getAllLocations() not returning location IDs
- 2 hours

# 4/13/24
- Troubleshooting docker
- Stopped because of too many login requests
- 1 hour

# 4/14/24
- Finished troubleshooting docker (Logged out and logged in through command line)
- 1 hour


# 4/19/24
- Started making unit tests for UserController
- Added null and empty username checking to UserService login()
- 2 hours

# 4/21/24 - 4/22/24
- Finished making unit tests for UserController
- Still needs documentation
- 2 hours

# 4/27/24
- Finished documentation on UserController tests (1 hour)
- Resolved merge conflict
- Removed unused imports in backend code
- Added comments to classes without comments
- 2 hours total

# 4/28/24
- Added comments to classes without comments
- Deleted LoginRequest and LandmarkRequest
- User and Landmark do the same thing
- Modified classes that used these
- 2 hours

# 4/29/24
- Moved documentation to gitlab and added markdown formatting
- 30 minutes

