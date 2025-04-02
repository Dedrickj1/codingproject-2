// backend/db/models/spot.js
// Pseudocode for Spot model
/*
1. Import required modules
2. Define Spot class extending Model
3. Define static associate method:
   - Spot belongs to User through ownerId (as Owner)
   - Spot has many SpotImages through spotId
   - Spot has many Reviews through spotId
   - Spot has many Bookings through spotId
4. Initialize Spot with these fields and validations:
   - ownerId: Non-nullable integer
   - address: Non-nullable string with validation for non-empty
   - city: Non-nullable string with validation for non-empty
   - state: Non-nullable string with validation for non-empty
   - country: Non-nullable string with validation for non-empty
   - lat: Non-nullable decimal with validation for range (-90 to 90)
   - lng: Non-nullable decimal with validation for range (-180 to 180)
   - name: Non-nullable string(50) with validation for length
   - description: Non-nullable text with validation for non-empty
   - price: Non-nullable decimal with validation for positive value
5. Export Spot model
*/