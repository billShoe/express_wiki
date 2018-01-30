'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rivet = sequelize.define('Rivet', {
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    shape: DataTypes.STRING,
    size: DataTypes.STRING,
    summary: DataTypes.STRING
  });
  return Rivet;
};
