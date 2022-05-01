'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      })
      this.hasMany(Order, {
        foreignKey: 'listingId',
      })
    }
  }
  Listing.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    modelLink: DataTypes.STRING,
    modelImage: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    downloadCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};