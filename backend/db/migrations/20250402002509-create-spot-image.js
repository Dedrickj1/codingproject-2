// backend/db/migrations/XXXXXXXXXXXXXX-create-spot-image.js
// Pseudocode for migration file
/*
1. Set up options object for production environment
2. Define up method:
   - Create SpotImages table with these fields:
     - id: Primary key, auto-increment, non-nullable integer
     - spotId: Non-nullable integer, references Spots.id with cascade delete
     - url: Non-nullable string
     - preview: Non-nullable boolean with default false
     - createdAt: Non-nullable date with CURRENT_TIMESTAMP default
     - updatedAt: Non-nullable date with CURRENT_TIMESTAMP default
3. Define down method:
   - Drop SpotImages table
*/