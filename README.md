# Requirements and Specification Document

## T13 BuckyWorld

### Project Abstract

“Buckyworld” is a mobile web application designed for users to explore the UW-Madison campus. Inspired by Pokemon Go, this game leverages location data to encourage players to visit various locations and events on campus to earn points. Players are able to play the game simultaneously, and all user information is stored directly in the app. 

### Customer

The main customers of this application are UW-Madison students and faculty, as well as potential future badgers. People who are interested in promoting a certain event on campus are encouraged to use the app to encourage other people to visit their events. In the context of the purpose of the application, the CS506 teaching team are also emphasized as customers of this application.

### Merge rules

**Main Branch**

Any merges to the main branch will require 1 approver from team 13. The approver may not be the person who made the code changes and/or created the merge request. The approver must evaluate the changes and run the application on their machine to ensure the new changes do not break the application.

**Dev Branch**

For issues that involve developing any new feature, changes must first be merged into the dev branch before merging to main.
**Exception**: if code on the main branch is broken (meaning any previously working features have stopped working due to a breaking change), a member of team 13 can make a merge request directly to the main branch given approval.

### Running The Application

To run locally, go to the buckymongo directory and run `docker compose up --build`, make sure you have docker running on your computer

**Note**: it is not recommended to run the app on the vm until we get a pipeline set up with automatic updates

To see what is running on the vm, on your local computer, run `ssh user@cs506-team-13.cs.wisc.edu -L localhost:3000:localhost:3000` in a new terminal window

In general, to access the shared repository on the vm

run `ssh user@cs506-team-13.cs.wisc.edu`

then `cd /nobackup/buckymongo/`

you should be inside the repository

To add to the mySQL tables in the buckyworld_db database:

`docker exec -it database mysql -u root -p`

enter the password as determined by team

then

`use buckyworld_db`

now enter the needed queries

### User Requirements

#### Page Requirements

1. **Landmark Pages**

- 1. There must exist a page for each landmark in the database.
- 2. The general page elements shall be:
  - a. A square frame for the landmark's `photo`
  - b. A field for the `name` of the landmark
  - c. A field for the landmark's `description`\*
  - d. An "I'm here" button
    * i. When the landmark is unvisited, the button color shall be saturated, and when pressed, must begin the location-comparing script. Otherwise (when the landmark is visited) the button color shall be desaturated, and when pressed, must prompt popup text to show for **x** amount of time before hiding, which reads "you already checked in here today!"
  - e. A field for the number of points the landmark is associated with
    - i. When the landmark is unvisited this field's color is saturated, otherwise this field's color is desaturated.
- 3. When "I'm here" button is pressed, the location-comparing script which returns a number (the distance between the user and the landmark) must be prompted to run. _(location-comparing script need not be accurate to fulfill this requirement, but it must return a number for this requirement to be testable)_
  * a. If the number returned is less than or equal to **y**, The landmark shall be set to its visited state\*\*, and the current date must be recorded. **(By way of** **not yet described behavior, see _Landmark States_ epic)** The users total point count (though not displayed on this page) shall be updated to include the number of `points` the landmark is worth. The page must be refreshed to update fields that check for landmark completeness.
  * b. If the number returned is greater than **y**, there is a popup indicating that the verification was unsuccessful, with text instructions to move closer to the landmark or try again.

2. **Map Page**

- 1. The map shall be oriented on each page load such that the device's location is centered.
- 2. Dragging a finger / clicked mouse on the screen shall cause the map view to scroll/move around, revealing and hiding landmark pins as they come in/out of the window.
- 3. Pinching and expanding the screen should zoom in and zoom out of the map
- 4. There shall be a way for the user to see how many points they have directly on the map page
- 5. There shall be a button on the bottom of the screen that, on click, pulls up a sub-page\* populated with landmark thumbnails. On every load of this page, the location-comparing script shall be run for each landmark. _(note: Location-comparing script must be functioning but need not be accurate to fulfill this criterion)_ The thumbnails shall, for each landmark that exists in the database display the landmark data `photo` and `name`, as well as the location-comparing script's returned value (distance from user) for that landmark. The landmark thumbnails must be displayed left to right in order of smallest to largest distance from user. The displayed landmark thumbnails should be scrollable horizontally. There must be a **way** to exit this sub-page and return to the map page.
- 6. On click, landmark pins and thumbnails direct user to their corresponding landmark page. _(The landmark page need not be populated to fulfill this criterion)_
- 7. On every page-load the landmark pins and thumbnails shall check to see if their landmark is visited **(See Landmark Stages epic)**
  * a. In the case that the landmark that they both represent is visited, the pin may be green and thumbnail data desaturated.
  * b. In the case that the landmark is unvisited, the pin may be red and thumbnail data saturated.
- 8. There may be a hamburger-menu button on the upper left that links to the menu page. _(The menu page need not be populated to fulfill this criteria)_


4. **Page to Add Landmarks** (priority = **low**)
- 1. there must exist a page for users to add landmarks to the map page
- 2. there shall be a way for the user to enter latitude and longitude coordinates of their landmark
- 3. there shall be a place for the user to enter the url of an image, description, and point value for the location

5. **User Login Page**
- 1. For a user that has previously registered an account, there must be an area for a username and password to be entered
- 2. there must be a login button
- 3. upon click, the login button must route the user to the map page

6. **User Registration Page**
- 1. For a user that does not already have an account, there must be an area for the user to enter a username of their choice (given that it is not already taken by another user), a password, and an area for them to retype the password
- 2. there must be a sign in button
- 3. upon click, the sign in button must route the user to the map page

7. **User Page**
- 1. There must be a button for the user to press to log out of the application
  * a. Upon pressing the log out button, the button must route the user to the login page
- 2. The users position on the leaderboard must be displayed above any buttons
- 3. There must be a button for the user to access account settings (priority = **low**)
  * a. The account settings must give the option for the user to change their username and password


#### Database Requirements

7. **Landmark Table**

* 1. There must be a database of landmarks comprised of the following fields:
  * `id` **long** (primary key)
  * `name` **string**
  * `latitude` **double**
  * `longitude` **double**
  * `url` **string**
  * `description` **string**
  * `points` **integer** (number of points the landmark is worth)

8. **User Table**

* 1. There must be a table of users comprised of the following fields:
  * `id` **long** (primary key) 
  * `username` **string** (unique)
  * `total points` **integer**

9. **Attended Table**

* 1. There must be a table that exemplifies the relation between the attended entity and user entity comprised of the following fields:
  * `id` **long** (primary key) 
  * `uid` **long** (foreign key)
  * `lid` **long** (foreign key)


#### Game Requirements

10. **Location Comparing**

* 1. There shall be a location-comparing script that compares a landmark's location coordinates to the current location coordinates of the user, returning the absolute value of the distance in miles between them (Granularity of measurement must be determined by team)
* 2. This script shall be runnable from the map page (It must be able to run for all landmarks to determine the order in which thumbnails are displayed) and the landmark pages (It must be able to run for the landmark whose page is open to determine if the user is close enough.)


11. **Earning points**

* 1. The application must successfully update the user table in the database to reflect newly earned points for the user upon attendance of a lcoation
* 2. The user table should increment the total points attribute to it's current value plus the point value of the location that the user visited
* 3. The number of points must reset to 0 at the end of the day

12. **Leaderboard** (priority = **low**)

* 1. Users must be sorted by their point value
* 2. The User Page should display the top 10 usernames along with their respective point value

13. **Adding Landmarks**
* 3. The user must have an account associated with buckyworld in order to add landmarks to the game


#### Account Management Requirements

14. **Account Management**

* 1. Upon landing on the sign in and sign up page, there must be a place to create an account for the application using an existing google account
* 2. A valid, exisiting google account must be created before creating an account on the application
* 3. The users email will be used as the username
* 4. Upon either signing in or signing up, the map page will then be loaded
* 5. Upon sign in through the sign in page, the existance of the user name must be verified in the user table, in other words, the username that was entered should be in the table

* 1. Upon pressing the sign in button on the sign in page
  * a. If the username already exists in the users table, the user must be notified through an alert to choose a different username
  * b. Otherwise, the users username and password should be stored in the users table with a default point value of 0, and the user should be routed to the map page

15. **VM Deployment**
* 1. The application must successfully run on the cs506-team-13 CSL machine
* 2. The frontend must be accessible through port 3000
* 3. The backend must be accessible through port 8080
* 4. There must be a group access token for everyone on team 13 to make necessary changes to the repository running on the VM


### Use Cases & User Stories

#### Use Cases

1. **Landmark Page Display and Interaction**
* 1. Display landmark details including photo, name, description, and points
* 2. Enable users to check in at landmarks, updating the landmark's state and the user's points based on location verification.
  
2. **Map Page Usage**
* 3. Load and center the map on the user's current location, allowing interaction like scrolling and zooming.
* 4. Display nearby landmarks and their details, sorted by proximity.
  
3. **User Account Registration and Login**
* 6. Facilitate new user registration, including username and password setup.
* 7. Allow existing users to log in by verifying credentials against the database.  
  
4. **Account Management**
* 8. Enable logged-in users to log out, redirecting them to the login page.
* 9. Offer account settings adjustments, including username and password changes.  
  
5. **Database Interaction**
* 10. Store and retrieve landmark and user data, including check-in records, to support the application's functionality.
  
6. **Game Mechanics and Location Comparison**
* 11. Implement a location-comparing script to facilitate checking in and displaying nearby landmarks accurately
* 12. Update user points based on landmark visits
  
7. **Leaderboard Dynamics**
* 13. Display a leaderboard showing users ranked by points to encourage competition and engagement.

8. **Adding Landmarks Usage**
* 14. Display input boxes for the user to enter landmark attributes
* 15. Update the map with the new landmark


#### Stories

1. **Registering and Managing Accounts**
* 1. As a new user, I want to be authenticated and authorized through google auth to have and use an account for this application
* 2. As a user, I want to be able to start earning points after I sign into the app
* 3. As a user, I want to indicate I am done using the app after I sign out of the application
* 4. As a user, I want the points I earned to persist after I sign out of the application so that I can pick up where I left off at a later time

2. **Participating in the Leaderboard**
* 1. As a user, I want to see my position on the leaderboard
* 2. As a user I want to see the leaderboard of the top 10 users ranked (priority = **low**)

3. **Viewing Landmark Information**
* As a user, I want to access a page for each landmark so I can learn about it, see its photo, and check in to earn points
* As a user, I want to verify whether I am close enough to a landmark to receive its respective points

4. **Checking in at Landmarks**
* As a user, I want to press an "I'm here" button at a landmark to check in, earning points and marking it as visited.

5. **Navigating the Map**
* As a user, I want to view a list of nearby landmarks, sorted by distance, so I can decide which ones to visit.
* As a user, I want to zoom in/out and drag the map to navigate to different areas of the map

6. **Exploring Nearby Landmarks**
* As a user, I want to view a list of nearby landmarks, sorted by distance, so I can decide which ones to visit.

7. **Adding Landmarks**
* As a user, I want to add new landmarks to the game for me and my peers to earn points
* As a user, I want to be able to input the name, latitude, longitude, image url, points, and description for the landmark I want to add
* As a user, I want to be notified if my landmark was added to the game


### API Calls

[here](./Notes/API_Calls.md)

### User Interface Requirements

Users should be able to view a map page upon login. This map page should have markers at each location where points can be obtained. The user must also be able to scroll through the various locations at the bottom of their map page, where they can click on each “mini description” of the location to see more details. The user must be able to access their user information and progress through the hamburger button on the top left of the map page. This user page also will give the option to logout of the application. After the user clicks a location to get routed to the respective location page, the user will see a button to indicate to the app that they are nearby a location. If the user has already earned the points for this location or event, the button will be disabled. The app will notify the user through a modal whether they are close enough to the location and whether points were earned.

Click [here](https://www.figma.com/file/gwIdFXAXYb3qn6OHZ4jeXi/Wireframe-first-draft?type=design&node-id=3-61&mode=design) for a rough wireframe

### Security Requirements

There is no sensitive information that will be stored in the database. However, privacy and confidentiality are an issue if the user's username and password are entered into the application by an unwanted party.

### System Requirements

Location services must be turned on for the user’s browser.

### Specification

![architecture diagram](Notes/System_Architecture_Diagram.png)



![ER diagram](Notes/ER_Diagram.png)


### Technology Stack

Frontend: React + Next.js with Typescript, npm as package manager
Backend: Java Spring Boot, Gradle for build

### Standards & Conventions

[here](./CodingStandards.md)

## Team Information

### Members and strengths: 

Amelia - java, C, javascript/html/css, react/react native, android studio, graphic design

Bora - java,docker,python

Lucas - frontend, python, js/ts, java

Jordan - java, c/c++, python, little bit of html and javascript

Trishika - java, python, react/react native, javascript, html, css

Mitch - javascript, python, html, css, React, React native

### Roles:

 #### Sprint 0 and 1

PO: Amelia

SM: Lucas

#### Sprint 2

PO: Trishika

SM: Mitchell Brenner

#### Sprint 3

PO: Bora Depecik

SM: Jordan Bucher
