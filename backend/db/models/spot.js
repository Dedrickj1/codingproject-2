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
     state: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     country: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     lat: {
       type: DataTypes.FLOAT,
       allowNull: false,
     },
     lng: {
       type: DataTypes.FLOAT,
       allowNull: false,
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     description: {
       type: DataTypes.TEXT,
       allowNull: false,
     },
     price: {
       type: DataTypes.FLOAT,
       allowNull: false,
     },
     ownerId: {
       type: DataTypes.INTEGER,
       allowNull: false,
     }
   });
 
   Spot.associate = function(models) {
     // Define associations here, if necessary
   };
 
   return Spot;
 };
 