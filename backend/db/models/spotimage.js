// backend/db/models/spotimage.js
// Pseudocode for SpotImage model
/*
1. Import required modules
2. Define SpotImage class extending Model
3. Define static associate method:
   - SpotImage belongs to Spot through spotId
4. Initialize SpotImage with these fields and validations:
   - spotId: Non-nullable integer
   - url: Non-nullable string with validation for URL format
   - preview: Boolean with default false
5. Export SpotImage model
*/