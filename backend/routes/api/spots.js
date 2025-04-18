// backend/routes/api/spots.js
// Pseudocode for Spots router

/*
1. Import required modules:
   - express
   - Sequelize models (Spot, SpotImage, User, Review, Booking)
   - Authentication middleware (requireAuth)
   - Validation utilities (check, handleValidationErrors)
   - Sequelize operators (Op)

2. Create router object

3. Define validation middleware:
   - validateSpot: Validates all spot fields
   - validateQueryFilters: Validates query parameters for pagination and filtering

4. Implement GET /api/spots:
   - Apply validateQueryFilters middleware
   - Parse query parameters with defaults (page=1, size=20)
   - Build filtering conditions based on query parameters
   - Calculate pagination (limit, offset)
   - Query database for spots with filters, pagination, and calculations
   - Format response with proper data types
   - Return JSON response with spots, page, and size

5. Implement GET /api/spots/current:
   - Apply requireAuth middleware
   - Get current user ID from request
   - Query database for spots owned by current user
   - Format response with proper data types
   - Return JSON response with spots

6. Implement GET /api/spots/:id:
   - Extract spot ID from request parameters
   - Query database for spot with details
   - Check if spot exists, return 404 if not
   - Format response with proper data types
   - Return JSON response with spot details

7. Implement POST /api/spots:
   - Apply requireAuth and validateSpot middleware
   - Extract spot data from request body
   - Create new spot with current user as owner
   - Format response with proper data types
   - Return 201 status with JSON response

8. Implement POST /api/spots/:id/images:
   1. Create a POST route for /api/spots/:id/images
2. Apply requireAuth middleware
3. Extract from request:
   - spotId from params
   - url and preview from body
4. Try:
   - Find spot by ID
   - If spot doesn't exist, return 404 with error message
   - If current user is not the owner, return 403 with "Forbidden" message
   - Create new SpotImage with spotId, url, preview
   - Format response with id, url, preview
   - Return 201 status with formatted response
5. Catch:
   - Return 500 status with error message

9. Implement PUT /api/spots/:id:
  1. Create a PUT route for /api/spots/:id
2. Apply requireAuth and validateSpot middleware
3. Extract from request:
   - spotId from params
   - address, city, state, country, lat, lng, name, description, price from body
4. Try:
   - Find spot by ID
   - If spot doesn't exist, return 404 with error message
   - If current user is not the owner, return 403 with "Forbidden" message
   - Update spot with new data
   - Format response with all spot fields and proper data types
   - Return formatted response
5. Catch:
   - If validation error, return 400 with validation error messages
   - Otherwise, return 500 with error message

10. Implement DELETE /api/spots/:id:
1. Create a DELETE route for /api/spots/:id
2. Apply requireAuth middleware
3. Extract spotId from params
4. Try:
   - Find spot by ID
   - If spot doesn't exist, return 404 with error message
   - If current user is not the owner, return 403 with "Forbidden" message
   - Delete the spot
   - Return success message
5. Catch:
   - Return 500 with error message

11. Export router
module.exports = router;
*/