// backend/db/migrations/XXXXXXXXXXXXXX-create-spot.js
// Pseudocode for migration file
/*
1. Set up options object for production environment
2. Define up method:
   - Create Spots table with these fields:
     - id: Primary key, auto-increment, non-nullable integer
     - ownerId: Non-nullable integer, references Users.id with cascade delete
     - address: Non-nullable string
     - city: Non-nullable string
     - state: Non-nullable string
     - country: Non-nullable string
     - lat: Non-nullable decimal(10,7)
     - lng: Non-nullable decimal(10,7)
     - name: Non-nullable string(50)
     - description: Non-nullable text
     - price: Non-nullable decimal(10,2)
     - createdAt: Non-nullable date with CURRENT_TIMESTAMP default
     - updatedAt: Non-nullable date with CURRENT_TIMESTAMP default
3. Define down method:
   - Drop Spots table
*/
