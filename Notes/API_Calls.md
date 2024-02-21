# API Calls

### User registration / Authentication
- POST /api/users/register : Register a new user
- POST /api/users/login : Login + authenticate a user

### User profile
- GET /api/users/{userid} : Get user profile and info
- PUT /api/users/{userid} : Update user profile info

### Bucky Collection
- GET /api/buckys : Get all bucky's
- GET /api/buckys/{buckyid} : Get a specific bucky's info
- POST /api/buckys/{buckyid}/collect : Collect a bucky by taking a picture at its location

### User Progression
- GET /api/users/{userid}/progress : Get user's progress (buckys collected, points, level, etc)

### Location
- GET /api/locations : Get all bucky locations
- GET /api/locations/{locationid} : Get a specific bucky location's info
