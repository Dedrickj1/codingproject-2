module.exports = (sequelize, DataTypes) => {
   const Spot = sequelize.define('Spot', {
     address: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     city: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     // other attributes...
   });
 
   Spot.associate = function(models) {
     // Define associations here
   };
 
   return Spot;
 };