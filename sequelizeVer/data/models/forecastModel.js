'use strict';

module.exports = (sequelize, DataTypes) => {
  const Forecast = sequelize.define('Forecast',
      {
               id: {
                        allowNull: false,
                    autoIncrement: true,
                       primaryKey: true,
                             type: DataTypes.INTEGER
                   },
                data: {
                            type: DataTypes.JSON
                }

      },{
             timestamps: true,
            underscored: true
  });

  Forecast.associate = function(models) {
    // association defined in models/index.js
  };

  return Forecast;

};
